
import React, { useState } from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Clock, Tag } from "lucide-react";

interface TodoFormProps {
  onAdd: (text: string) => void;
  isLoading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd, isLoading = false }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <div className="glass-card mb-8 dark:bg-card/50 dark:backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Plus className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium">Add new task</h3>
        </div>
        
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isLoading}
          className="h-11 mb-3 bg-secondary/50 border-0 focus-visible:ring-1 dark:bg-secondary"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button type="button" className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/80 transition-colors">
              <Calendar className="h-4 w-4" />
            </button>
            <button type="button" className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/80 transition-colors">
              <Clock className="h-4 w-4" />
            </button>
            <button type="button" className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/80 transition-colors">
              <Tag className="h-4 w-4" />
            </button>
          </div>
          
          <ButtonCustom
            type="submit"
            disabled={!text.trim() || isLoading}
            isLoading={isLoading}
            size="sm"
            className="h-9"
          >
            Add task
          </ButtonCustom>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
