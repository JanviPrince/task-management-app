import { Task } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MoreHorizontal, Edit2, Trash2, CheckCircle2, Clock, Circle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { format } from 'date-fns';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskTable({ tasks, onEdit, onDelete, onStatusChange }: TaskTableProps) {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'In Progress':
        return <Clock size={16} className="text-amber-500" />;
      default:
        return <Circle size={16} className="text-neutral-400" />;
    }
  };

  const getStatusBadgeClass = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#10b981]/15 text-[#047857] border-[#10b981]/20';
      case 'In Progress':
        return 'bg-[#3b82f6]/15 text-[#1d4ed8] border-[#3b82f6]/20';
      default:
        return 'bg-[#fbbf24]/15 text-[#b45309] border-[#fbbf24]/20';
    }
  };

  return (
    <div className="bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden shadow-xl">
      <Table>
        <TableHeader className="bg-white/20 dark:bg-white/5 border-b border-white/10">
          <TableRow className="hover:bg-transparent border-b border-white/10">
            <TableHead className="w-[300px] font-bold text-[#4B5563] dark:text-neutral-400 text-xs uppercase tracking-wider py-5 px-8">Task Name</TableHead>
            <TableHead className="font-bold text-[#4B5563] dark:text-neutral-400 text-xs uppercase tracking-wider py-5">Status</TableHead>
            <TableHead className="font-bold text-[#4B5563] dark:text-neutral-400 text-xs uppercase tracking-wider py-5">Priority</TableHead>
            <TableHead className="font-bold text-[#4B5563] dark:text-neutral-400 text-xs uppercase tracking-wider py-5">Due Date</TableHead>
            <TableHead className="text-right font-bold text-[#4B5563] dark:text-neutral-400 text-xs uppercase tracking-wider py-5 px-8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-48 text-center text-neutral-500 font-medium">
                No tasks found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-white/20 dark:hover:bg-white/5 transition-all border-b border-white/10 dark:border-white/5 last:border-0 group">
                <TableCell className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-[#1F2937] dark:text-white text-base group-hover:text-accent transition-colors">{task.title}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 max-w-[280px] font-medium">
                      {task.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusBadgeClass(task.status)} font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full`}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`text-sm font-bold ${
                    task.priority === 'High' ? 'text-red-500' :
                    task.priority === 'Medium' ? 'text-indigo-500 dark:text-indigo-400' : 'text-neutral-400 dark:text-neutral-500'
                  }`}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-[#4B5563] dark:text-neutral-400 font-mono font-medium">
                    {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </span>
                </TableCell>
                <TableCell className="text-right px-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10 dark:text-white">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white/80 dark:bg-black/80 backdrop-blur-md border-white/20 dark:border-white/10">
                      <DropdownMenuLabel className="dark:text-white">Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(task)} className="dark:text-white focus:bg-accent focus:text-white">
                        <Edit2 size={14} className="mr-2" /> Edit Task
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="dark:bg-white/10" />
                      <DropdownMenuLabel className="dark:text-white">Quick Status Change</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onStatusChange(task.id, 'Todo')} className="dark:text-white focus:bg-accent focus:text-white">
                        Set to Todo
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusChange(task.id, 'In Progress')} className="dark:text-white focus:bg-accent focus:text-white">
                        Set to In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusChange(task.id, 'Completed')} className="dark:text-white focus:bg-accent focus:text-white">
                        Set to Completed
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="dark:bg-white/10" />
                      <DropdownMenuItem 
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 dark:text-red-400 focus:text-white focus:bg-red-500"
                      >
                        <Trash2 size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
