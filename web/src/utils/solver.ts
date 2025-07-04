import { TrieTree } from "./tree";

export interface Solution {
  words: string[];
  usedChars: string[];
  remainingChars: string[];
}

export const listSubtract = (original: string[], sub: string[]): string[] => {
  const copy = [...original];
  sub.forEach((char) => copy.splice(copy.indexOf(char), 1));

  return copy;
};

export const solve = (tree: TrieTree, usedChars: string[], remainingChars: string[]) => {
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
