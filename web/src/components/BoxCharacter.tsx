import { Component } from "solid-js";

interface Props {
  character: string;
}

export const BoxCharacter: Component<Props> = (props) => {
  return (
    <div class="w-8 h-8 border-2 rounded-lg bg-violet-200 font-bold flex justify-center items-center text-xl">
      {props.character.toUpperCase()}
    </div>
  );
};
