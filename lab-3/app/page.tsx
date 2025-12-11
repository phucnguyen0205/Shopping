'use client'; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Check, X } from "lucide-react"; 
import { useTaskManagement } from "@/hooks/usetaskmanagement"; 

export default function Home() {
  const {
    tasks,
    newTaskText,
    tasksRemaining,
    setNewTaskText,
    handleFormSubmit,
    handleDelete,
    handleToggleComplete,
  } = useTaskManagement();

  return (
    <div className="flex w-full justify-center font-sans py-8">
      <div className="w-full max-w-lg p-4 bg-white shadow-xl rounded-lg">
        <form onSubmit={handleFormSubmit} className="flex gap-0 mb-6 border border-blue-400 rounded-lg overflow-hidden">
          <Input 
            className="flex-grow h-10 border-none focus-visible:ring-0 shadow-none px-4"
            placeholder="Add a task here..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold h-10 w-12 p-0 rounded-none transition-colors"
            disabled={!newTaskText.trim()}
          >
            +
          </Button>
        </form>
        <div className="space-y-3">
          {tasks.map((task) => {
            const isCompletedStyle = task.isCompleted;
            const bgColor = isCompletedStyle ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border border-gray-200';
            const buttonColor = isCompletedStyle ? 'text-white hover:bg-blue-400' : 'text-gray-500 hover:bg-gray-100';

            return (
              <div 
                key={task.id} 
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm transition-colors ${bgColor}`}
              >
                <span className={`flex-grow ${isCompletedStyle ? 'line-through' : ''}`}>
                  {task.text}
                </span>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 p-0 ${buttonColor}`}
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 p-0 ${buttonColor}`}
                    onClick={() => handleDelete(task.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-sm text-gray-600 text-center">
          <Label> {tasksRemaining} tasks remaining</Label>
        </div>
      </div>
    </div>
  );
}