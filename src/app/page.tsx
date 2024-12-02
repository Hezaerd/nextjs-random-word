"use client";

import { useState, useEffect } from "react";
import { generate } from "random-words";
import { Button } from "@/components/ui/button";
import { RefreshCw, Heart } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { WordWithDefinition } from "@/components/ui/word-with-definition";

export default function Home() {
  const [randomWord, setRandomWord] = useState("");
  const [likedWords, setLikedWords] = useState<string[]>([]);
  const [wordHistory, setWordHistory] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'random' | 'liked' | 'history'>('random');

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

  const RandomWordView = () => (
    <div className="flex flex-col items-center justify-center flex-1">
      <WordWithDefinition word={randomWord}>
        <p className="text-4xl font-bold hover:text-primary/80 transition-colors cursor-help">
          {randomWord}
        </p>
      </WordWithDefinition>
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
            <WordWithDefinition word={word}>
              <span className="cursor-help hover:text-primary/80 transition-colors">
                {word}
              </span>
            </WordWithDefinition>
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

  const HistoryView = () => (
    <div className="flex-1 p-8 h-screen overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">Word History</h1>
      <div className="flex flex-col gap-3 max-w-md h-[calc(100vh-8rem)] overflow-y-auto">
        {wordHistory.map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="px-4 py-2 bg-secondary rounded-md flex items-center justify-between"
          >
            <WordWithDefinition word={word}>
              <span className="cursor-help hover:text-primary/80 transition-colors">
                {word}
              </span>
            </WordWithDefinition>
            <div className="flex items-center gap-2">
              {likedWords.includes(word) ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleUnlike(word)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleLikeFromHistory(word)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        {wordHistory.length === 0 && (
          <p className="text-muted-foreground">No word history yet. Go generate some!</p>
        )}
      </div>
    </div>
  );

  const handleLikeFromHistory = (word: string) => {
    const newLikedWords = [...likedWords, word];
    setLikedWords(newLikedWords);
    localStorage.setItem('likedWords', JSON.stringify(newLikedWords));
    toast({
      title: "❤️ Liked Word",
      description: `${word}`,
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      {currentView === 'random' ? (
        <RandomWordView />
      ) : currentView === 'liked' ? (
        <LikedWordsView />
      ) : (
        <HistoryView />
      )}
    </div>
  );
}
