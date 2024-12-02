import { Button } from "@/components/ui/button";
import { RefreshCw, Heart } from "lucide-react";

interface SidebarProps {
  currentView: 'random' | 'liked';
  onViewChange: (view: 'random' | 'liked') => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen border-r border-border bg-muted/40 p-4">
      <div className="space-y-2">
        <Button
          variant={currentView === 'random' ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onViewChange('random')}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Random Word
        </Button>
        <Button
          variant={currentView === 'liked' ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onViewChange('liked')}
        >
          <Heart className="mr-2 h-4 w-4" />
          Liked Words
        </Button>
      </div>
    </div>
  );
}