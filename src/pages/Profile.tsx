
import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { User, Mail, Calendar, Clock, Edit, Camera, Save } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings
            </p>
          </div>
          
          <ButtonCustom size="sm" className="text-white dark:text-white">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </ButtonCustom>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-semibold border-2 border-primary/20">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-secondary hover:bg-secondary/80 rounded-full p-2 shadow-sm border border-border">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
                <p className="text-muted-foreground text-sm">
                  {user?.email || 'user@example.com'}
                </p>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center p-2 border rounded-lg">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Joined</p>
                      <p className="text-sm font-medium">March 2024</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 border rounded-lg">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg mr-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Time Zone</p>
                      <p className="text-sm font-medium">UTC-5 (Eastern)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <Input 
                        id="fullName" 
                        defaultValue={user?.name || ''}
                        className="pl-10" 
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <div className="relative">
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue={user?.email || ''}
                        className="pl-10" 
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <textarea 
                    id="bio" 
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    defaultValue="I'm a productivity enthusiast always looking for better ways to organize my work and life."
                  />
                </div>
              </div>
              
              <div className="border-t my-6" />
              
              <h3 className="text-lg font-medium mb-4">Account Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your password to maintain security
                    </p>
                  </div>
                  <ButtonCustom variant="outline" size="sm" className="inline-flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    <span>Change</span>
                  </ButtonCustom>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notification Preferences</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure how and when you receive notifications
                    </p>
                  </div>
                  <ButtonCustom variant="outline" size="sm" className="inline-flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    <span>Configure</span>
                  </ButtonCustom>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Connected Accounts</h4>
                    <p className="text-sm text-muted-foreground">
                      Link your accounts for seamless integration
                    </p>
                  </div>
                  <ButtonCustom variant="outline" size="sm" className="inline-flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    <span>Manage</span>
                  </ButtonCustom>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
