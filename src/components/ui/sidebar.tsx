import { Button } from "@/components/ui/button";
import { RefreshCw, Heart, History } from "lucide-react";
import { GithubAuthButton } from "../auth/github-auth-button";

interface SidebarProps {
  currentView: 'random' | 'liked' | 'history';
  onViewChange: (view: 'random' | 'liked' | 'history') => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen border-r border-border bg-background lg:bg-muted/40 p-4 relative z-50">
      <div className="space-y-2 mt-16 lg:mt-0">
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
        <Button
          variant={currentView === 'history' ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onViewChange('history')}
        >
          <History className="mr-2 h-4 w-4" />
          History
        </Button>

        <GithubAuthButton />
      </div>
    </div>
  );
}