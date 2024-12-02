export async function getWordDefinition(word: string) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

  return response.json();
}