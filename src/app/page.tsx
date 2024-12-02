"use client";

import { useState, useEffect } from "react";
import { generate } from "random-words";
import { Button } from "@/components/ui/button";
import { RefreshCw, Heart } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [randomWord, setRandomWord] = useState("");
  const [likedWords, setLikedWords] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'random' | 'liked'>('random');

  const { toast } = useToast();

  useEffect(() => {
    setRandomWord(generate(1)[0]);

    const savedLikedWords = localStorage.getItem('likedWords');
    if (savedLikedWords) {
      setLikedWords(JSON.parse(savedLikedWords));
    }
  }, []);

  const handleGenerate = () => {
    setRandomWord(generate(1)[0]);
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

  const RandomWordView = () => (
    <div className="flex flex-col items-center justify-center flex-1">
      <p className="text-4xl font-bold">{randomWord}</p>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleGenerate} className="w-32">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate
        </Button>
        <Button
          onClick={handleLike}
          className="w-32"
          variant={likedWords.includes(randomWord) ? "secondary" : "default"}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${likedWords.includes(randomWord) ? "fill-current" : ""}`}
          />
          {likedWords.includes(randomWord) ? "Liked" : "Like"}
        </Button>
      </div>
    </div>
  );

  const LikedWordsView = () => (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Your Liked Words</h1>
      <div className="flex flex-wrap gap-3">
        {likedWords.map((word) => (
          <div
            key={word}
            className="px-4 py-2 bg-secondary rounded-md flex items-center gap-2"
          >
            <span>{word}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleUnlike(word)}
            >
              <Heart className="h-4 w-4 fill-current" />
            </Button>
          </div>
        ))}
        {likedWords.length === 0 && (
          <p className="text-muted-foreground">No liked words yet. Go generate some!</p>
        )}
      </div>
    </div>
  );

  const handleUnlike = (word: string) => {
    const newLikedWords = likedWords.filter(w => w !== word);
    setLikedWords(newLikedWords);
    localStorage.setItem('likedWords', JSON.stringify(newLikedWords));
    toast({
      description: `Removed "${word}" from liked words`,
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      {currentView === 'random' ? <RandomWordView /> : <LikedWordsView />}
    </div>
  );
}
