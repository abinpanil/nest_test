
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@/lib/todo";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { Search, Filter } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  isLoading?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onEdit,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all");
  const { isAdmin } = useAuth();

  // Filter todos based on search and filter status
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && !todo.completed) ||
      (filterStatus === "completed" && todo.completed);

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-foreground"
          >
            <path d="M11 20h4"></path>
            <path d="M12 4v16"></path>
            <path d="M18 12l-6 6-6-6"></path>
          </svg>
        </div>
        <h3 className="font-medium">No tasks yet</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Add your first task using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterStatus === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("active")}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterStatus === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterStatus === "completed"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No matching tasks found.
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
              showUser={isAdmin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
