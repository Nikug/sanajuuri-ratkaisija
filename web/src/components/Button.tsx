import { Component, JSX, splitProps } from "solid-js";
import { clsx } from "clsx";

export const Button: Component<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const [classes] = splitProps(props, ["class"]);

  return (
    <button
      {...props}
      class={clsx(
        classes.class,
        "p-2 rounded bg-violet-600 hover:bg-violet-700 text-white font-bold cursor-pointer"
      )}
    />
  );
};
