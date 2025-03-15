
import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Schedule and manage your tasks and events
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <ButtonCustom variant="outline" size="sm" className="h-9">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </ButtonCustom>
            <ButtonCustom
              variant="outline"
              size="sm"
              className="h-9 px-3 font-medium"
              onClick={() => setDate(new Date())}
            >
              Today
            </ButtonCustom>
            <ButtonCustom variant="outline" size="sm" className="h-9">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </ButtonCustom>
            <ButtonCustom size="sm" className="h-9 hidden sm:flex">
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </ButtonCustom>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64">
            <Card className="p-4">
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-sm font-medium">Mini Calendar</h3>
              </div>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="border rounded-lg p-3"
              />
              <div className="mt-4 space-y-1">
                <ButtonCustom
                  variant={view === "month" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setView("month")}
                >
                  Month View
                </ButtonCustom>
                <ButtonCustom
                  variant={view === "week" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setView("week")}
                >
                  Week View
                </ButtonCustom>
                <ButtonCustom
                  variant={view === "day" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setView("day")}
                >
                  Day View
                </ButtonCustom>
              </div>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="p-4 h-[600px] overflow-auto">
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="py-1 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-sm">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = new Date();
                  day.setDate(day.getDate() - day.getDay() + i);
                  const isToday = new Date().toDateString() === day.toDateString();
                  const isSelected = date.toDateString() === day.toDateString();
                  
                  return (
                    <div 
                      key={i}
                      className={`p-1 h-20 border rounded-lg ${
                        isToday ? "bg-primary/10 border-primary/30" : 
                        isSelected ? "bg-secondary/50 border-primary/20" : 
                        "hover:bg-secondary/30 border-border/50"
                      } cursor-pointer transition-colors`}
                      onClick={() => setDate(new Date(day))}
                    >
                      <div className="text-right font-medium p-1">
                        {day.getDate()}
                      </div>
                      {isToday && (
                        <div className="px-1.5 py-0.5 bg-primary/20 text-xs rounded-full w-fit">
                          Today
                        </div>
                      )}
                      {Math.random() > 0.8 && (
                        <div className="px-1.5 py-0.5 bg-secondary text-xs rounded-full w-fit mt-1 truncate">
                          Meeting
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
