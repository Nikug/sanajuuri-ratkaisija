import { Component, For } from "solid-js";
import { Solution as SolutionType } from "../utils/solver";
import { BoxCharacter } from "./BoxCharacter";

interface Props {
  solution: SolutionType;
}

export const Solution: Component<Props> = (props) => {
  return (
    <div class="flex flex-col items-center gap-1">
      <For each={props.solution.words}>
        {(word) => (
          <div class="flex gap-1">
            <For each={word.split("")}>{(character) => <BoxCharacter character={character} />}</For>
          </div>
        )}
      </For>
    </div>
  );
};
