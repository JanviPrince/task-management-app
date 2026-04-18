import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an email');
      return;
    }
    login(email);
    toast.success('Logged in successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg glass-panel shadow-2xl rounded-[32px] border-white/20 dark:border-white/10 p-8 dark:bg-black/60">
        <CardHeader className="space-y-4 flex flex-col items-center pb-8 border-b border-white/10 dark:border-white/5 mb-8">
          <div className="bg-accent text-white p-4 rounded-2xl shadow-lg shadow-accent/40">
            <CheckSquare size={32} />
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-black text-[#1F2937] dark:text-white tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-neutral-600 dark:text-neutral-400 font-medium text-base">
              Enter your credentials to access your dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-bold text-[#4B5563] dark:text-neutral-400 ml-1">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                className="bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 h-12 rounded-xl focus:bg-white/60 dark:focus:bg-white/10 transition-all placeholder:text-neutral-400 dark:text-white font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-sm font-bold text-[#4B5563] dark:text-neutral-400 ml-1">Password</Label>
              <Input 
                id="password" 
                type="password" 
                className="bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 h-12 rounded-xl focus:bg-white/60 dark:focus:bg-white/10 transition-all font-medium dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium ml-1">Hint: Any password works for this demo.</p>
            </div>
          </CardContent>
          <CardFooter className="pt-8">
            <Button type="submit" className="w-full bg-accent hover:opacity-90 text-white h-12 rounded-xl text-base font-bold shadow-lg shadow-accent/40 transition-all">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
