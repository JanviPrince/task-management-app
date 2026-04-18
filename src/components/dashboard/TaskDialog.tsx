import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../types';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Task;
  title: string;
}

export function TaskDialog({ open, onOpenChange, onSubmit, initialData, title }: TaskDialogProps) {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'Todo',
    priority: initialData?.priority || 'Medium',
    dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-panel border-white/20 dark:border-white/10 shadow-2xl rounded-3xl dark:bg-black/60">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#1F2937] dark:text-white tracking-tight">{title}</DialogTitle>
            <DialogDescription className="text-neutral-500 dark:text-neutral-400 font-medium">
              Fill in the details for the task below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-8">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-xs font-bold text-[#4B5563] dark:text-neutral-400 ml-1 uppercase tracking-wider">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 h-11 rounded-xl focus:bg-white/60 dark:focus:bg-white/10 transition-all font-medium placeholder:text-neutral-400 dark:text-white"
                placeholder="Finish task name..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-xs font-bold text-[#4B5563] dark:text-neutral-400 ml-1 uppercase tracking-wider">Description</Label>
              <textarea
                id="description"
                className="flex min-h-[100px] w-full rounded-xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-medium dark:text-white"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the task details..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-xs font-bold text-[#4B5563] dark:text-neutral-400 ml-1 uppercase tracking-wider">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: TaskStatus) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status" className="bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 h-11 rounded-xl focus:bg-white/60 dark:focus:bg-white/10 transition-all font-medium dark:text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md">
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority" className="text-xs font-bold text-[#4B5563] dark:text-neutral-400 ml-1 uppercase tracking-wider">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: TaskPriority) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger id="priority" className="bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 h-11 rounded-xl focus:bg-white/60 dark:focus:bg-white/10 transition-all font-medium dark:text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md">
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate" className="text-xs font-bold text-[#4B5563] dark:text-neutral-400 ml-1 uppercase tracking-wider">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 h-11 rounded-xl focus:bg-white/60 dark:focus:bg-white/10 transition-all font-medium dark:text-white dark:[color-scheme:dark]"
                required
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" className="rounded-xl h-11 border-white/30 dark:border-white/10 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:text-white" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent text-white hover:opacity-90 rounded-xl h-11 shadow-lg shadow-accent/40 font-bold px-8">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
