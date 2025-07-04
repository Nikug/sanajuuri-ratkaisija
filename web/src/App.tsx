import { createSignal, onMount, type Component } from "solid-js";
import { TextInput } from "./components/TextInput";
import { TrieTree } from "./utils/tree";
import wordList from "./assets/words.json";
import { Button } from "./components/Button";
import { listSubtract, solve } from "./utils/solver";

const App: Component = () => {
  const [tree, setTree] = createSignal<TrieTree>(new TrieTree());
  const [firstWord, setFirstWord] = createSignal<string>("");
  const [allCharacters, setAllCharacters] = createSignal<string>("");

  onMount(() => {
    const newTree = new TrieTree();
    newTree.insertMany(wordList);
    setTree(newTree);
  });

  const handleSolve = (event: SubmitEvent) => {
    event.preventDefault();

    const firstCharacters = firstWord().split("");
    const remainingCharacters = listSubtract(allCharacters().split(""), firstCharacters);
    const result = solve(tree(), firstCharacters, remainingCharacters);
    console.log(result);
  };

  return (
    <div class="bg-violet-50 w-screen h-screen flex justify-center">
      <div class="w-[800px] pt-4 pb-16">
        <h1 class="font-black text-4xl mb-8">Sanajuuri ratkaisija</h1>
        <form onSubmit={handleSolve}>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">
              <label for="first-word">Ensimmäinen sana</label>
              <TextInput
                id="first-word"
                class="w-64"
                value={firstWord()}
                onChange={(e) => setFirstWord(e.target.value)}
              />
            </div>
            <div class="flex flex-col gap-1">
              <label for="all-characters">Kaikki kirjaimet</label>
              <TextInput
                id="all-characters"
                class="w-64"
                value={allCharacters()}
                onChange={(e) => setAllCharacters(e.target.value)}
              />
            </div>
          </div>
          <Button class="mt-4" type="submit">
            Ratkaise
          </Button>
        </form>
      </div>
    </div>
  );
};

export default App;
