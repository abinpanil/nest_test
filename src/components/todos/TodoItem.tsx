
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Todo } from "@/lib/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  showUser?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
  showUser = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg transition-all",
        "bg-white dark:bg-card border border-border/40 shadow-sm hover:shadow",
        "animate-scale-in"
      )}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggleComplete(todo.id)}
        className="data-[state=checked]:bg-todo data-[state=checked]:border-todo"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="h-8"
            />
            <ButtonCustom
              variant="ghost"
              size="icon"
              onClick={handleSaveEdit}
              className="h-8 w-8"
            >
              <Check className="h-4 w-4" />
            </ButtonCustom>
            <ButtonCustom
              variant="ghost"
              size="icon"
              onClick={handleCancelEdit}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </ButtonCustom>
          </div>
        ) : (
          <div className="flex flex-col">
            <span
              className={cn(
                "text-sm font-medium",
                todo.completed && "line-through text-muted-foreground"
              )}
            >
              {todo.text}
            </span>
            
            {showUser && (
              <span className="text-xs text-muted-foreground mt-0.5">
                Added by {todo.userName}
              </span>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ButtonCustom
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </ButtonCustom>
          <ButtonCustom
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </ButtonCustom>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
