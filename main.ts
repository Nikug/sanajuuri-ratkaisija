import fs from "fs";
import { TrieTree } from "tree";

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

const solve = (tree: TrieTree, usedChars: string[], remainingChars: string[]) => {
  const solutions: Solution[] = [];
  const allChars = [...usedChars, ...remainingChars];
  const stack: Solution[] = [{ words: [usedChars.join("")], usedChars, remainingChars }];

  while (stack.length > 0) {
    const currentSolution = stack.pop()!;
    const words = tree.search(currentSolution.usedChars, currentSolution.remainingChars);

    for (const word of words) {
      const newRemainingChars = [...allChars];
      const newUsedChars = word.split("");
      newUsedChars.forEach((char) => newRemainingChars.splice(newRemainingChars.indexOf(char), 1));

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

const main = () => {
  console.log("Loading words...");
  console.time("Load");
  const tree = loadWords();
  console.timeEnd("Load");

  const usedChars = "osa".split("");
  const remainingChars = "taesl".split("");

  console.log("Solving...");
  console.time("Solve");
  const solutions = solve(tree, usedChars, remainingChars);
  console.timeEnd("Solve");

  console.log("Found solutions:", solutions.length);
};

main();
