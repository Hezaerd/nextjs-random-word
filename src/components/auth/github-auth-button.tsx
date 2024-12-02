import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function GithubAuthButton() {
  return (
    <Button onClick={signInWithGithub}>
      <Github />
    </Button>
  );
}

async function signInWithGithub() {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
}
