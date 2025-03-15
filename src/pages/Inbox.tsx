
import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Mail, 
  Star, 
  Archive, 
  Trash, 
  Clock, 
  Inbox as InboxIcon,
  Send,
  FileText,
  MoreHorizontal
} from "lucide-react";

const Inbox = () => {
  const demoMessages = [
    {
      id: 1,
      from: "Team ChronoTask",
      subject: "Welcome to ChronoTask!",
      preview: "Get started with your productivity journey...",
      date: "Today",
      read: true,
      starred: true,
    },
    {
      id: 2,
      from: "Calendar Updates",
      subject: "Your weekly schedule",
      preview: "Here's your schedule for the upcoming week...",
      date: "Yesterday",
      read: false,
      starred: false,
    },
    {
      id: 3,
      from: "Task Assignments",
      subject: "New task assigned to you",
      preview: "You have been assigned a new task with high priority...",
      date: "Mar 10",
      read: false,
      starred: false,
    },
    {
      id: 4,
      from: "Project Management",
      subject: "Project status update",
      preview: "The current status of your project is...",
      date: "Mar 8",
      read: true,
      starred: false,
    },
    {
      id: 5,
      from: "Reminder Service",
      subject: "Upcoming deadline",
      preview: "You have a task due tomorrow at 5PM...",
      date: "Mar 5",
      read: true,
      starred: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
            <p className="text-muted-foreground">
              Manage messages and notifications
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-10 h-9 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-56">
            <Card className="p-3">
              <ButtonCustom size="sm" className="w-full mb-4">
                <Send className="h-4 w-4 mr-2" />
                Compose
              </ButtonCustom>
              
              <div className="space-y-1">
                <ButtonCustom
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <InboxIcon className="h-4 w-4 mr-2" />
                  Inbox
                  <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    2
                  </span>
                </ButtonCustom>
                
                <ButtonCustom
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </ButtonCustom>
                
                <ButtonCustom
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Sent
                </ButtonCustom>
                
                <ButtonCustom
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Drafts
                </ButtonCustom>
                
                <ButtonCustom
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Snoozed
                </ButtonCustom>
                
                <ButtonCustom
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archived
                </ButtonCustom>
                
                <ButtonCustom
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Trash
                </ButtonCustom>
              </div>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                  <ButtonCustom variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Archive className="h-4 w-4" />
                  </ButtonCustom>
                  <ButtonCustom variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash className="h-4 w-4" />
                  </ButtonCustom>
                  <ButtonCustom variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Clock className="h-4 w-4" />
                  </ButtonCustom>
                </div>
                
                <ButtonCustom variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </ButtonCustom>
              </div>
              
              <div className="divide-y">
                {demoMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`p-3 flex items-center gap-3 hover:bg-secondary/50 cursor-pointer ${
                      !message.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-8">
                      <ButtonCustom variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Star className={`h-4 w-4 ${message.starred ? "text-yellow-400 fill-yellow-400" : ""}`} />
                      </ButtonCustom>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium truncate ${!message.read ? "font-semibold" : ""}`}>
                          {message.from}
                        </p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap pl-2">
                          {message.date}
                        </p>
                      </div>
                      
                      <p className="text-sm truncate">
                        {message.subject}
                      </p>
                      
                      <p className="text-xs text-muted-foreground truncate">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;
