import { useState, useCallback } from "react";

export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type UseTaskManagement = {
  tasks: Task[];
  newTaskText: string;
  tasksRemaining: number;
  setNewTaskText: (text: string) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  handleDelete: (taskId: string) => void;
  handleToggleComplete: (taskId: string) => void;
};

export const useTaskManagement = (): UseTaskManagement => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  
  // Tính toán số task còn lại
  const tasksRemaining = tasks.filter(t => !t.isCompleted).length;

  const handleAdd = useCallback(() => {
    if (newTaskText.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      isCompleted: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  }, [newTaskText, tasks]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleAdd();
  }, [handleAdd]);

  const handleDelete = useCallback((taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }, [tasks]);

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, [tasks]);

  return {
    tasks,
    newTaskText,
    tasksRemaining,
    setNewTaskText,
    handleFormSubmit,
    handleDelete,
    handleToggleComplete,
  };
};