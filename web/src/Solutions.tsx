import { Component, Show, For } from "solid-js";
import { Solution as SolutionType } from "./utils/solver";
import { Solution } from "./components/Solution";

interface Props {
  solutions: SolutionType[];
}

export const Solutions: Component<Props> = (props) => {
  return (
    <div>
      <Show
        when={props.solutions.length > 0}
        fallback={<h3 class="text-xl font-bold">Ei ratkaisuja</h3>}
      >
        <h3 class="text-3xl font-bold mb-8">Ratkaisut ({props.solutions.length})</h3>
        <div class="flex flex-col gap-8 items-start">
          <For each={props.solutions}>{(solution) => <Solution solution={solution} />}</For>
        </div>
      </Show>
    </div>
  );
};
