import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/ui/button';
import { LogOut, LayoutDashboard, CheckSquare, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="max-w-6xl w-full h-[800px] glass-panel shadow-2xl rounded-[32px] overflow-hidden flex self-center">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/20 hidden md:flex flex-col bg-white/10">
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
            <div className="bg-accent text-white p-2 rounded-lg shadow-sm">
              <CheckSquare size={18} />
            </div>
            <span>DevFlow</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              location.pathname === '/' 
                ? 'bg-accent/15 text-accent shadow-sm' 
                : 'text-neutral-500 dark:text-neutral-400 hover:text-accent hover:bg-accent/5'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </nav>

        <div className="px-8 pb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-neutral-500 dark:text-neutral-400 font-semibold hover:bg-accent/5 hover:text-accent"
          >
            {theme === 'light' ? (
              <>
                <Moon size={18} />
                Dark Mode
              </>
            ) : (
              <>
                <Sun size={18} />
                Light Mode
              </>
            )}
          </Button>
        </div>

        <div className="p-6 border-t border-white/20">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-white/40 border-2 border-white flex items-center justify-center text-xs font-bold text-neutral-700 dark:text-neutral-200">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 text-[#1F2937] dark:text-neutral-100">
              <p className="text-sm font-bold truncate">{user?.name}</p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">{user?.email}</p>
            </div>
            <button 
              onClick={logout}
              className="text-neutral-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center min-w-0 bg-transparent">
        <header className="h-20 border-b border-white/20 flex items-center justify-between px-8 md:hidden bg-white/20">
           <div className="flex items-center gap-2 font-bold text-lg text-neutral-900 dark:text-white">
            <CheckSquare size={18} className="text-accent" />
            <span>DevFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut size={18} />
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
