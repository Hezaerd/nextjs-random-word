import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { WordWithDefinition } from "@/components/ui/word-with-definition";

interface LikedWordsViewProps {
  likedWords: string[];
  onUnlike: (word: string) => void;
}

export function LikedWordsView({ likedWords, onUnlike }: LikedWordsViewProps) {
  return (
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
              onClick={() => onUnlike(word)}
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
}