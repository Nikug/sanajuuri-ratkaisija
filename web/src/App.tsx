import type { Component } from "solid-js";
import { TextInput } from "./components/TextInput";

const App: Component = () => {
  return (
    <div class="bg-violet-50 w-screen h-screen">
      <h1 class="font-black text-4xl">This is header</h1>
      <TextInput />
    </div>
  );
};

export default App;
