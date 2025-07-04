import { Component } from "solid-js";

interface Props {
  character: string;
}

export const BoxCharacter: Component<Props> = (props) => {
  return (
    <div class="w-10 h-10 border-2 rounded-lg bg-violet-200 font-bold flex justify-center items-center text-xl">
      {props.character.toUpperCase()}
    </div>
  );
};
