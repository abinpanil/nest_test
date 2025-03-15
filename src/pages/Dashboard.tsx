
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TodoList from "@/components/todos/TodoList";
import TodoForm from "@/components/todos/TodoForm";
import { useAuth } from "@/lib/auth";
import { getTodos, addTodo, toggleTodoComplete, editTodo, deleteTodo, Todo } from "@/lib/todo";
import { useToast } from "@/components/ui/use-toast";
import { CheckSquare } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const fetchedTodos = await getTodos(user);
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        toast({
          variant: "destructive",
          title: "Failed to load tasks",
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [user, toast]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleAddTodo = async (text: string) => {
    if (!user) return;
    
    try {
      setIsAdding(true);
      const newTodo = await addTodo(text, user);
      setTodos([newTodo, ...todos]);
      toast({
        title: "Task added",
        description: "Your new task has been created.",
      });
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast({
        variant: "destructive",
        title: "Failed to add task",
        description: "Please try again.",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleComplete = async (id: string) => {
    if (!user) return;
    
    try {
      const updatedTodo = await toggleTodoComplete(id, user);
      setTodos(
        todos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      toast({
        variant: "destructive",
        title: "Failed to update task",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleEditTodo = async (id: string, text: string) => {
    if (!user) return;
    
    try {
      const updatedTodo = await editTodo(id, text, user);
      setTodos(
        todos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to edit todo:", error);
      toast({
        variant: "destructive",
        title: "Failed to update task",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!user) return;
    
    try {
      await deleteTodo(id, user);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast({
        title: "Task deleted",
        description: "Your task has been removed.",
      });
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete task",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  // Get counts for analytics
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = todos.length - completedTodos;
  const completionRate = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today's date */}
          <div className="glass-card p-5 col-span-2 dark:bg-card/50 dark:backdrop-blur-md">
            <h1 className="text-2xl font-bold mb-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h1>
            <p className="text-muted-foreground">
              {isAdmin 
                ? "Admin view: Manage all tasks from all users"
                : "Organize your tasks and boost productivity"}
            </p>
          </div>
          
          {/* Quick stats */}
          <div className="glass-card p-5 flex flex-col justify-between dark:bg-card/50 dark:backdrop-blur-md">
            <div className="text-sm text-muted-foreground mb-2">Task completion</div>
            <div className="flex justify-between mb-2">
              <div>
                <div className="text-3xl font-semibold">{completionRate}%</div>
                <div className="text-xs text-muted-foreground">{completedTodos} of {todos.length} tasks</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="progress-bar dark:bg-background">
              <div 
                className="progress-value bg-primary" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <TodoForm onAdd={handleAddTodo} isLoading={isAdding} />
        
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
