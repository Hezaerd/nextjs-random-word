import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { WordWithDefinition } from "@/components/ui/word-with-definition";

interface HistoryViewProps {
  wordHistory: string[];
  likedWords: string[];
  onUnlike: (word: string) => void;
  onLike: (word: string) => void;
}

export function HistoryView({
  wordHistory,
  likedWords,
  onUnlike,
  onLike
}: HistoryViewProps) {
  return (
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
                  onClick={() => onUnlike(word)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => onLike(word)}
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
}