
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch"; // Fixed import
import {
  Bell,
  Lock,
  User,
  Globe,
  Database,
  Clock,
  ShieldCheck,
  Save,
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="p-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account settings
                </p>
              </div>
              <Separator className="my-4" />
              <nav className="space-y-2">
                <a
                  href="#account"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-primary/5 text-primary font-medium"
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </a>
                <a
                  href="#appearance"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-secondary/80 text-muted-foreground"
                >
                  <Globe className="h-4 w-4" />
                  <span>Appearance</span>
                </a>
                <a
                  href="#notifications"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-secondary/80 text-muted-foreground"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </a>
                <a
                  href="#security"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-secondary/80 text-muted-foreground"
                >
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </a>
                <a
                  href="#data"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-secondary/80 text-muted-foreground"
                >
                  <Database className="h-4 w-4" />
                  <span>Data & Sync</span>
                </a>
              </nav>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="p-6" id="account">
              <h3 className="text-lg font-medium mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full p-2 rounded-md border border-border bg-background"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-2 rounded-md border border-border bg-background"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <ButtonCustom>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </ButtonCustom>
                </div>
              </div>
            </Card>

            <Card className="p-6" id="appearance">
              <h3 className="text-lg font-medium mb-4">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Dark Mode</label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark theme
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6" id="notifications">
              <h3 className="text-lg font-medium mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Email Notifications
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about task reminders
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Task Reminders</label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for upcoming tasks
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6" id="security">
              <h3 className="text-lg font-medium mb-4">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Two-Factor Authentication
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={twoFactor}
                    onCheckedChange={setTwoFactor}
                  />
                </div>
                <div className="pt-2">
                  <ButtonCustom variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </ButtonCustom>
                </div>
              </div>
            </Card>

            <Card className="p-6" id="data">
              <h3 className="text-lg font-medium mb-4">Data & Sync</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto Sync</label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync data across devices
                    </p>
                  </div>
                  <Switch
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Backup Data</label>
                    <p className="text-sm text-muted-foreground">
                      Last backup: 3 days ago
                    </p>
                  </div>
                  <ButtonCustom variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Backup Now
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

export default Settings;
