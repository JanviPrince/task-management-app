import { Task } from '../types';

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Initialize Dashboard UI',
    description: 'Set up the main layout and navigation for the task management dashboard.',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-04-20',
    createdAt: '2026-04-10',
    updatedAt: '2026-04-12',
  },
  {
    id: '2',
    title: 'Implement Auth Logic',
    description: 'Create a mock authentication system with localStorage persistence.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2026-04-22',
    createdAt: '2026-04-11',
    updatedAt: '2026-04-11',
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Connect the frontend markers to the backend services for real-time data.',
    status: 'Todo',
    priority: 'Low',
    dueDate: '2026-04-25',
    createdAt: '2026-04-12',
    updatedAt: '2026-04-12',
  },
  {
    id: '4',
    title: 'Design System Polish',
    description: 'Refine the Tailwind CSS configurations and custom component styles.',
    status: 'Todo',
    priority: 'High',
    dueDate: '2026-04-18',
    createdAt: '2026-04-13',
    updatedAt: '2026-04-13',
  },
  {
    id: '5',
    title: 'Unit Testing',
    description: 'Write comprehensive tests for the task filtering and sorting logic.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2026-04-28',
    createdAt: '2026-04-14',
    updatedAt: '2026-04-14',
  },
];

export const MOCK_USER = {
  id: 'u-1',
  email: 'intern@example.com',
  name: 'Developer Intern',
};
