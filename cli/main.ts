import fs from "fs";
import { TrieTree } from "tree";
import { createInterface } from "readline/promises";
import { stdin, stdout } from "process";

interface Solution {
  words: string[];
  usedChars: string[];
  remainingChars: string[];
}

const loadWords = (): TrieTree => {
  const json = fs.readFileSync("scripts/words.json", "utf8");
  const words = JSON.parse(json);

  const tree = new TrieTree();
  tree.insertMany(words);
  return tree;
};

const prettyPrintSolution = (words: string[]): void => {
  if (words.length === 0) return;
  const longestWord = words.at(-1)!.length;

  console.log();
  for (const word of words) {
    const spaces = longestWord - word.length;
    console.log(" ".repeat(spaces) + word.split("").join(" "));
  }
};

const listSubtract = (original: string[], sub: string[]): string[] => {
  const copy = [...original];
  sub.forEach((char) => copy.splice(copy.indexOf(char), 1));

  return copy;
};

const solve = (tree: TrieTree, usedChars: string[], remainingChars: string[]) => {
  const solutions: Solution[] = [];
  const allChars = [...usedChars, ...remainingChars];
  const stack: Solution[] = [{ words: [usedChars.join("")], usedChars, remainingChars }];

  while (stack.length > 0) {
    const currentSolution = stack.pop()!;
    const words = tree.search(currentSolution.usedChars, currentSolution.remainingChars);

    for (const word of words) {
      const newUsedChars = word.split("");
      const newRemainingChars = listSubtract(allChars, newUsedChars);

      const nextSolution = {
        words: [...currentSolution.words, word],
        usedChars: newUsedChars,
        remainingChars: newRemainingChars,
      };

      if (nextSolution.remainingChars.length === 0) {
        solutions.push(nextSolution);
      } else {
        stack.push(nextSolution);
      }
    }
  }

  return solutions;
};

const main = async () => {
  console.log("Loading words...");
  console.time("Load");
  const tree = loadWords();
  console.timeEnd("Load");

  const rl = createInterface({ input: stdin, output: stdout });
  const firstWord = await rl.question("First word: ");
  const allChars = await rl.question("All characters: ");
  rl.close();

  const usedChars = firstWord.split("");
  const remainingChars = listSubtract(allChars.split(""), usedChars);

  console.log("Solving...");
  console.time("Solve");
  const solutions = solve(tree, usedChars, remainingChars);
  console.timeEnd("Solve");

  console.log("Found solutions:", solutions.length);

  if (solutions.length > 0) {
    console.log("First three solutions:");
    solutions.slice(0, 3).forEach((solution) => prettyPrintSolution(solution.words));
  }
};

await main();
