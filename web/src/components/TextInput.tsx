import { Component, JSX, splitProps } from "solid-js";
import { clsx } from "clsx";

export const TextInput: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [classes] = splitProps(props, ["class"]);

  return (
    <input type="text" {...props} class={clsx(classes.class, "p-1 rounded bg-violet-200 border")} />
  );
};
