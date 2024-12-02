import { Button } from "@/components/ui/button";
import { RefreshCw, Heart } from "lucide-react";
import { WordWithDefinition } from "@/components/ui/word-with-definition";

interface WordViewProps {
  randomWord: string;
  likedWords: string[];
  onGenerate: () => void;
  onLike: () => void;
}

export function WordView({
  randomWord,
  likedWords,
  onGenerate,
  onLike
}: WordViewProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <WordWithDefinition word={randomWord}>
        <p className="text-4xl font-bold hover:text-primary/80 transition-colors cursor-help">
          {randomWord}
        </p>
      </WordWithDefinition>
      <div className="flex gap-2 mt-4">
        <Button onClick={onGenerate} className="w-32">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate
        </Button>
        <Button
          onClick={onLike}
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
}