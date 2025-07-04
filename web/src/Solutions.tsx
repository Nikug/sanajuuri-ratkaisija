import { Component, Show, For, createSignal } from "solid-js";
import { Solution as SolutionType } from "./utils/solver";
import { Solution } from "./components/Solution";
import { SolutionGroup } from "./utils/grouping";
import clsx from "clsx";
import { DynamicSolution } from "./components/DynamicSolution";

interface Props {
  solutions: SolutionType[];
  groupedSolutions: SolutionGroup;
}

export const Solutions: Component<Props> = (props) => {
  const [activeTab, setActiveTab] = createSignal<number>(0);

  return (
    <div>
      <Show
        when={props.solutions.length > 0}
        fallback={<h3 class="text-xl font-bold">Ei ratkaisuja</h3>}
      >
        <div class="flex gap-4 text-xl mb-4">
          <button
            class={clsx(
              {
                "font-bold text-violet-600 hover:text-violet-700": activeTab() === 0,
                "text-gray-500 hover:text-gray-600": activeTab() !== 0,
              },
              "cursor-pointer bg-none border-none outline-none"
            )}
            onClick={() => setActiveTab(0)}
          >
            Dynaaminen ratkaisu
          </button>
          <button
            class={clsx(
              {
                "font-bold text-violet-600 hover:text-violet-700": activeTab() === 1,
                "text-gray-500 hover:text-gray-600": activeTab() !== 1,
              },
              "cursor-pointer bg-none border-none outline-none"
            )}
            onClick={() => setActiveTab(1)}
          >
            Kaikki ratkaisut ({props.solutions.length})
          </button>
        </div>
        <Show when={activeTab() === 0}>
          <DynamicSolution groupedSolutions={props.groupedSolutions} />
        </Show>
        <Show when={activeTab() === 1}>
          <div class="flex flex-col gap-8 items-start">
            <For each={props.solutions}>{(solution) => <Solution solution={solution} />}</For>
          </div>
        </Show>
      </Show>
    </div>
  );
};
