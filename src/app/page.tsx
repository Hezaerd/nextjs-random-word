"use client";

import { useState, useEffect } from "react";
import { generate } from "random-words";
import { Sidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { WordView } from "@/components/views/word-view";
import { LikedWordsView } from "@/components/views/liked-words-view";
import { HistoryView } from "@/components/views/history-view";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [randomWord, setRandomWord] = useState("");
  const [likedWords, setLikedWords] = useState<string[]>([]);
  const [wordHistory, setWordHistory] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'random' | 'liked' | 'history'>('random');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const initialWord = generate(1)[0];
    setRandomWord(initialWord);
    setWordHistory([initialWord]);

    const savedLikedWords = localStorage.getItem('likedWords');
    const savedWordHistory = localStorage.getItem('wordHistory');

    if (savedLikedWords) {
      setLikedWords(JSON.parse(savedLikedWords));
    }
    if (savedWordHistory) {
      setWordHistory(JSON.parse(savedWordHistory));
    }
  }, []);

  const handleGenerate = () => {
    const newWord = generate(1)[0];
    setRandomWord(newWord);
    const newHistory = [newWord, ...wordHistory].slice(0, 50); // Keep last 50 words
    setWordHistory(newHistory);
    localStorage.setItem('wordHistory', JSON.stringify(newHistory));
  };

  const handleLike = () => {
    const newLikedWords = [...likedWords];

    if (newLikedWords.includes(randomWord)) {
      const index = newLikedWords.indexOf(randomWord);
      newLikedWords.splice(index, 1);
      toast({
        title: "💔 Unliked Word",
        description: `${randomWord}`,
      });
    } else {
      newLikedWords.push(randomWord);
      toast({
        title: "❤️ Liked Word",
        description: `${randomWord}`,
      });
    }

    setLikedWords(newLikedWords);
    localStorage.setItem('likedWords', JSON.stringify(newLikedWords));
  };

  const handleUnlike = (word: string) => {
    const newLikedWords = likedWords.filter(w => w !== word);
    setLikedWords(newLikedWords);
    localStorage.setItem('likedWords', JSON.stringify(newLikedWords));
    toast({
      description: `Removed "${word}" from liked words`,
    });
  };

  const handleLikeFromHistory = (word: string) => {
    const newLikedWords = [...likedWords, word];
    setLikedWords(newLikedWords);
    localStorage.setItem('likedWords', JSON.stringify(newLikedWords));
    toast({
      title: "❤️ Liked Word",
      description: `${word}`,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden absolute top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed inset-0 z-40 lg:relative
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
        <Sidebar
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden pt-16 lg:pt-0">
        {currentView === 'random' ? (
          <WordView
            randomWord={randomWord}
            likedWords={likedWords}
            onGenerate={handleGenerate}
            onLike={handleLike}
          />
        ) : currentView === 'liked' ? (
          <LikedWordsView
            likedWords={likedWords}
            onUnlike={handleUnlike}
          />
        ) : (
          <HistoryView
            wordHistory={wordHistory}
            likedWords={likedWords}
            onUnlike={handleUnlike}
            onLike={handleLikeFromHistory}
          />
        )}
      </div>
    </div>
  );
}
