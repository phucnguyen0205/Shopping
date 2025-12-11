import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react"; 

type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskItem({ task, onDelete, onToggleComplete }: TaskItemProps) {
  const isCompletedStyle = task.isCompleted;
  // Màu sắc task: Xanh dương khi hoàn thành, Trắng khi chưa hoàn thành
  const bgColor = isCompletedStyle ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border border-gray-200';
  // Màu nút chức năng: Trắng khi task xanh, Xám/Đen khi task trắng
  const buttonColor = isCompletedStyle ? 'text-white hover:bg-blue-400' : 'text-gray-500 hover:bg-gray-100';

  return (
    <div 
      key={task.id} 
      className={`flex justify-between items-center p-3 rounded-lg shadow-sm transition-colors ${bgColor}`}
    >
      <span className={`flex-grow ${isCompletedStyle ? 'line-through' : ''}`}>
        {task.text}
      </span>
      
      {/* Nút Chức năng */}
      <div className="flex gap-2 ml-4">
        <Button
          variant="ghost"
          size="icon"
          className={`h-6 w-6 p-0 ${buttonColor}`}
          onClick={() => onToggleComplete(task.id)}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-6 w-6 p-0 ${buttonColor}`}
          onClick={() => onDelete(task.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}