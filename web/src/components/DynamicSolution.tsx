import { Component, createEffect, createSignal, For, on, Show } from "solid-js";
import { SolutionGroup } from "../utils/grouping";
import { ToggleGroup } from "./ToggleGroup";
import { Solution as SolutionType } from "../utils/solver";
import { Solution } from "./Solution";

interface Props {
  groupedSolutions: SolutionGroup;
}

export const DynamicSolution: Component<Props> = (props) => {
  const [selectedWords, setSelectedWords] = createSignal<string[]>([]);

  createEffect(
    on(
      () => props.groupedSolutions,
      () => setSelectedWords([])
    )
  );

  const handleSelect = (index: number, word: string | null) => {
    let newSelectedWords = selectedWords().slice(0, index);
    if (word != null) {
      newSelectedWords[index] = word;
    }
    setSelectedWords(newSelectedWords);
  };

  const getFilteredValues = (group: Record<string, SolutionType[]>, level: number): string[] => {
    if (level === 0) {
      return Object.keys(group);
    }

    const previousWord = selectedWords()[level - 1];
    if (!previousWord) {
      return Object.keys(group);
    }

    const result = new Set<string>();
    for (const [word, solutions] of Object.entries(group)) {
      const wordIsValid = solutions.some((solution) => solution.words[level - 1] === previousWord);
      if (wordIsValid) {
        result.add(word);
      }
    }

    return Array.from(result);
  };

  const createdSolution = () => {
    const solution: SolutionType = {
      words: selectedWords(),
      usedChars: [],
      remainingChars: [],
    };

    return solution;
  };

  return (
    <div>
      <div class="flex flex-col gap-4 mb-8">
        <For each={props.groupedSolutions}>
          {(group, i) => (
            <div class="flex gap-2">
              <p class="mt-1 whitespace-nowrap">{i() + 1}. taso</p>
              <ToggleGroup
                values={getFilteredValues(group, i())}
                selected={selectedWords()[i()] ?? null}
                onChange={(newWord) => handleSelect(i(), newWord)}
                disabled={i() > selectedWords().length}
              />
            </div>
          )}
        </For>
      </div>
      <Show when={selectedWords().length > 0}>
        <div class="flex flex-col items-start">
          <h3 class="font-bold text-xl mb-4">Sanajuuren ratkaisu</h3>
          <Solution solution={createdSolution()} />
        </div>
      </Show>
    </div>
  );
};
