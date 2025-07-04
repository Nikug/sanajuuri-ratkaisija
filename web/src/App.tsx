import { createSignal, onMount, Show, type Component } from "solid-js";
import { TextInput } from "./components/TextInput";
import { TrieTree } from "./utils/tree";
import wordList from "./assets/words.json";
import { Button } from "./components/Button";
import { listSubtract, Solution, solve } from "./utils/solver";
import { Solutions } from "./Solutions";
import { groupSolutions, SolutionGroup } from "./utils/grouping";

const App: Component = () => {
  const [tree, setTree] = createSignal<TrieTree>(new TrieTree());
  const [firstWord, setFirstWord] = createSignal<string>("");
  const [allCharacters, setAllCharacters] = createSignal<string>("");
  const [solutions, setSolutions] = createSignal<Solution[]>([]);
  const [groupedSolutions, setGroupedSolutions] = createSignal<SolutionGroup>([]);
  const [solved, setSolved] = createSignal<boolean>(false);

  const [firstWordError, setFirstWordError] = createSignal<string>("");
  const [allCharactersError, setAllCharactersError] = createSignal<string>("");

  onMount(() => {
    const newTree = new TrieTree();
    newTree.insertMany(wordList);
    setTree(newTree);
  });

  const handleSolve = (event: SubmitEvent) => {
    event.preventDefault();
    setAllCharactersError("");
    setFirstWordError("");

    const word = firstWord().toLowerCase();
    const characters = allCharacters().toLowerCase();

    if (word.length !== 3) {
      setFirstWordError("Tarvitaan 3 kirjainta");
    }

    if (characters.length !== 8) {
      setAllCharactersError("Tarvitaan 8 kirjainta");
    }

    if (allCharactersError() || firstWordError()) return;

    const firstCharacters = word.split("");
    const remainingCharacters = listSubtract(characters.split(""), firstCharacters);

    if (remainingCharacters.length !== 5) {
      setAllCharactersError("Ensimmäinen sana ei sisälly kaikkiin kirjaimiin");
      return;
    }

    const result = solve(tree(), firstCharacters, remainingCharacters);
    setSolutions(result);
    setGroupedSolutions(groupSolutions(result));
    setSolved(true);
  };

  return (
    <div class="bg-violet-50 w-screen min-h-screen flex justify-center">
      <div class="w-[800px] pt-8 pb-16 px-2">
        <h1 class="font-black text-4xl">Sanajuuri-ratkaisija</h1>
        <div class="flex gap-1 mb-8 text-sm">
          <a class="underline" href="https://github.com/Nikug/sanajuuri-ratkaisija">
            Github
          </a>
          <a class="underline" href="https://www.hs.fi/pelit/art-2000011201869.html">
            Sanajuuri
          </a>
          <a class="underline" href="https://www.kielitoimistonsanakirja.fi/#/">
            Kielitoimiston sanakirja
          </a>
        </div>
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
              <Show when={firstWordError()}>
                <p class="text-red-600 text-sm">{firstWordError()}</p>
              </Show>
            </div>
            <div class="flex flex-col gap-1">
              <label for="all-characters">Kaikki kirjaimet</label>
              <TextInput
                id="all-characters"
                class="w-64"
                value={allCharacters()}
                onChange={(e) => setAllCharacters(e.target.value)}
              />
              <Show when={allCharactersError()}>
                <p class="text-red-600 text-sm">{allCharactersError()}</p>
              </Show>
            </div>
          </div>
          <Button class="mt-4" type="submit">
            Ratkaise
          </Button>
        </form>
        <div class="mt-8">
          <Show when={solved()}>
            <Solutions solutions={solutions()} groupedSolutions={groupedSolutions()} />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default App;
