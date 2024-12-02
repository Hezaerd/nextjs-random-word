import { useState } from "react";
import { getWordDefinition } from "@/lib/dictionary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

interface WordWithDefinitionProps {
  word: string;
  children: React.ReactNode;
}

export function WordWithDefinition({ word, children }: WordWithDefinitionProps) {
  const [definition, setDefinition] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMouseEnter = async () => {
    if (!definition && !loading) {
      setLoading(true);
      try {
        const data = await getWordDefinition(word);
        if (data[0]?.meanings[0]?.definitions[0]?.definition) {
          setDefinition(data[0].meanings[0].definitions[0].definition);
        } else {
          setError("No definition found");
        }
      } catch (err) {
        setError("Failed to load definition" + err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger onMouseEnter={handleMouseEnter} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] text-sm">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading definition...
            </div>
          ) : error ? (
            <span className="text-muted-foreground">{error}</span>
          ) : (
            definition
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}