import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { TaskTable } from '../components/dashboard/TaskTable';
import { TaskDialog } from '../components/dashboard/TaskDialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Task, TaskStatus } from '../types';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { 
    tasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount
  } = useTasks();
  
  const { user } = useAuth();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
    toast.success('Task created successfully');
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
      toast.success('Task updated successfully');
    }
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      toast.success('Task deleted');
    }
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    updateTask(id, { status });
    toast.success(`Status updated to ${status}`);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] dark:text-white tracking-tight">Tasks</h1>
          <p className="text-neutral-600 dark:text-neutral-400 font-medium tracking-tight">
            Track your team's progress and stay productive.
          </p>
        </div>
        <Button 
          onClick={() => setIsAddOpen(true)}
          className="bg-accent text-white hover:opacity-90 shadow-lg shadow-accent/40 rounded-xl px-6 h-11 flex items-center gap-2 font-bold"
        >
          <Plus size={18} />
          Create Task
        </Button>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <Input 
            placeholder="Search by title..." 
            className="pl-12 bg-white/40 dark:bg-black/20 border-white/30 dark:border-white/10 h-11 rounded-xl focus:bg-white/60 dark:focus:bg-black/30 transition-all placeholder:text-neutral-400 dark:text-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white/40 dark:bg-black/20 border border-white/30 dark:border-white/10 p-1.5 rounded-xl shadow-sm">
             <Select value={statusFilter} onValueChange={(value: any) => {
                setStatusFilter(value);
                setCurrentPage(1);
             }}>
              <SelectTrigger className="border-0 focus:ring-0 w-[140px] h-9 bg-transparent text-sm font-bold text-neutral-700 dark:text-white">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-[1px] h-4 bg-white/40" />
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="border-0 focus:ring-0 w-[160px] h-9 bg-transparent text-sm font-bold text-neutral-700 dark:text-white">
                <SelectValue placeholder="Sort by: Due Date" />
              </SelectTrigger>
              <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="title">Alphabetical</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <TaskTable 
          tasks={tasks} 
          onEdit={openEditDialog} 
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
              Showing <span className="text-accent">{tasks.length}</span> of {totalCount} tasks
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg h-9 w-9 p-0 border-white/20 bg-white/10 dark:bg-black/20 text-neutral-700 dark:text-white"
              >
                <ChevronLeft size={16} />
              </Button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-9 w-9 p-0 rounded-lg font-bold ${
                      currentPage === i + 1 
                        ? 'bg-accent text-white' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg h-9 w-9 p-0 border-white/20 bg-white/10 dark:bg-black/20 text-neutral-700 dark:text-white"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <TaskDialog 
        open={isAddOpen} 
        onOpenChange={setIsAddOpen} 
        onSubmit={handleAddTask}
        title="Create New Task"
      />

      {editingTask && (
        <TaskDialog 
          open={isEditOpen} 
          onOpenChange={setIsEditOpen} 
          onSubmit={handleEditTask}
          initialData={editingTask}
          title="Edit Task"
        />
      )}
    </div>
  );
}
