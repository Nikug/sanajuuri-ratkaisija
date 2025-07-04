import { Solution } from "./solver";

export type SolutionGroup = Record<string, Solution[]>[];

export const groupSolutions = (solutions: Solution[]): SolutionGroup => {
  const result: SolutionGroup = [];
  if (!solutions.length) return result;

  const wordLevelCount = solutions[0].words.length;
  if (wordLevelCount === 0) return result;

  for (let i = 0; i < wordLevelCount; i++) {
    const levelMap: Record<string, Solution[]> = {};
    for (const solution of solutions) {
      const word = solution.words[i];
      if (levelMap[word]) {
        levelMap[word].push(solution);
      } else {
        levelMap[word] = [solution];
      }
    }

    result.push(levelMap);
  }

  return result;
};
