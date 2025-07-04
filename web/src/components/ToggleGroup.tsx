import clsx from "clsx";
import { Component, For } from "solid-js";

interface Props {
  selected: string | null;
  values: string[];
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export const ToggleGroup: Component<Props> = (props) => {
  const handleSelect = (value: string) => {
    if (props.disabled) return;

    if (props.selected === value) {
      props.onChange(null);
    } else {
      props.onChange(value);
    }
  };

  return (
    <div class="flex gap-1 flex-wrap">
      <For each={props.values}>
        {(value) => (
          <button
            class={clsx(
              {
                "text-white bg-violet-600 hover:bg-violet-700": value === props.selected,
                "bg-none bg-gray-200 text-gray-600 border-gray-300": value !== props.selected,
                "opacity-50 cursor-not-allowed": props.disabled,
                "cursor-pointer": !props.disabled,
              },
              "rounded px-2 py-1 border"
            )}
            onClick={() => handleSelect(value)}
          >
            {value}
          </button>
        )}
      </For>
    </div>
  );
};
