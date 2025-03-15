
import { User } from "./auth";
import { supabase } from "@/integrations/supabase/client";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  userName: string;
  createdAt: Date;
}

// Database row shape
interface TodoRow {
  id: string;
  text: string;
  completed: boolean;
  userid: string;    // Note: lowercase in database
  username: string;  // Note: lowercase in database
  createdat: string; // Note: lowercase in database
}

// Convert database row to Todo model
const mapRowToTodo = (row: TodoRow): Todo => ({
  id: row.id,
  text: row.text,
  completed: row.completed,
  userId: row.userid,       // Map from lowercase to camelCase
  userName: row.username,   // Map from lowercase to camelCase
  createdAt: new Date(row.createdat), // Map from lowercase to camelCase
});

// Get todos for a user
export const getTodos = async (currentUser: User): Promise<Todo[]> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('createdat', { ascending: false });
      
    if (error) throw error;
    
    // Filter todos based on user role
    const userTodos = currentUser.role === 'admin' 
      ? data 
      : data.filter((todo: any) => todo.userid === currentUser.id);
    
    // Convert to Todo objects
    return userTodos.map(mapRowToTodo);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Add a new todo
export const addTodo = async (text: string, currentUser: User): Promise<Todo> => {
  try {
    const newTodo = {
      text,
      completed: false,
      userid: currentUser.id,       // Use lowercase to match DB schema
      username: currentUser.name,   // Use lowercase to match DB schema
      createdat: new Date().toISOString() // Use lowercase to match DB schema
    };
    
    const { data, error } = await supabase
      .from('todos')
      .insert([newTodo])
      .select()
      .single();
      
    if (error) throw error;
    
    // Return the new todo
    return mapRowToTodo(data);
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Toggle todo completion status
export const toggleTodoComplete = async (id: string, currentUser: User): Promise<Todo> => {
  try {
    // First, get the current todo to check its completed status
    const { data: todo, error: fetchError } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single();
      
    if (fetchError) throw fetchError;
    
    // Toggle the completion status
    const { data, error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    // Return the updated todo
    return mapRowToTodo(data);
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
};

// Edit a todo
export const editTodo = async (id: string, text: string, currentUser: User): Promise<Todo> => {
  try {
    // Update the todo text
    const { data, error } = await supabase
      .from('todos')
      .update({ text })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    // Return the updated todo
    return mapRowToTodo(data);
  } catch (error) {
    console.error("Error editing todo:", error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: string, currentUser: User): Promise<void> => {
  try {
    // Delete the todo
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
