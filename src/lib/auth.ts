
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Types
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Local storage keys
const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('No user data returned');
    }
    
    // Get user profile
    let userProfile: any = null;
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      // If no profile, create one with basic info
      if (profileError.code === 'PGRST116') {
        const newProfile = {
          id: data.user.id,
          name: email.split('@')[0], // Basic name from email
          role: 'user' as UserRole,
        };
        
        const { data: newProfileData, error: newProfileError } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();
          
        if (newProfileError) throw newProfileError;
        userProfile = newProfileData;
      } else {
        throw profileError;
      }
    } else {
      userProfile = profileData;
    }
    
    // Create user object
    const user: User = {
      id: data.user.id,
      email: data.user.email || '',
      name: userProfile?.name || email.split('@')[0],
      role: (userProfile?.role as UserRole) || 'user',
    };
    
    // Store session in local storage for compatibility with current app
    localStorage.setItem(AUTH_TOKEN_KEY, data.session.access_token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

// Register function
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  try {
    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('No user data returned');
    }
    
    // Create profile - this should be handled by the database trigger,
    // but we'll create it explicitly as a fallback
    const profile = {
      id: data.user.id,
      name,
      role: 'user' as UserRole,
    };
    
    // Check if profile already exists (it should be created by the trigger)
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();
      
    // Only insert profile if it doesn't exist yet
    if (!existingProfile && !profileCheckError) {
      console.log('Creating profile manually since trigger did not create one');
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([profile]);
        
      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Continue anyway, as the trigger might create the profile later
      }
    }
    
    // Create user object
    const user: User = {
      id: data.user.id,
      email: data.user.email || '',
      name,
      role: 'user',
    };
    
    // Store session in local storage if available
    if (data.session) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.session.access_token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      console.log('No session returned from signup - email confirmation may be required');
    }
    
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error);
  
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

// React hook for authentication
export const useAuth = () => {
  // Use lazy initialization to avoid calling getCurrentUser() on every render
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // If we have a session but no user in localStorage, fetch user info
        if (!getCurrentUser()) {
          try {
            // Get user profile
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .single();
              
            if (profileError) {
              console.error("Error fetching user profile:", profileError);
              return;
            }
              
            if (profileData) {
              const user: User = {
                id: data.session.user.id,
                email: data.session.user.email || '',
                name: profileData.name,
                role: profileData.role as UserRole,
              };
              
              localStorage.setItem(AUTH_TOKEN_KEY, data.session.access_token);
              localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
              setUser(user);
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        }
      } else {
        // No session, clear any stored user
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setUser(null);
      }
    };
    
    checkSession();

    // Subscribe to auth changes
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          // Get user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
           
          if (profileError) {
            console.error("Error fetching user profile:", profileError);
            return;
          }
            
          if (profileData) {
            const user: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: profileData.name,
              role: profileData.role as UserRole,
            };
            
            localStorage.setItem(AUTH_TOKEN_KEY, session.access_token);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
            setUser(user);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setUser(null);
      }
    });

    // Cleanup
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const loginFn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login error in hook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerFn = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const user = await register(email, password, name);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Register error in hook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutFn = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error in hook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login: loginFn,
    register: registerFn,
    logout: logoutFn,
    isAdmin: user?.role === "admin",
    isAuthenticated: !!user,
  };
};
