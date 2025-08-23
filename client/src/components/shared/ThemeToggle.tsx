import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 relative overflow-hidden transition-all duration-300 hover:scale-110 hover:bg-primary/10 dark:hover:bg-primary/20"
      data-testid="theme-toggle"
    >
      <Sun 
        className={`h-4 w-4 transition-all duration-500 ${
          theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
        } absolute`}
      />
      <Moon 
        className={`h-4 w-4 transition-all duration-500 ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        } absolute`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}