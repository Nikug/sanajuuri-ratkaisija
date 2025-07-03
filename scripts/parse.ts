import fs from "fs";

const loadFile = (filename: string): string[] => {
  const lines = fs.readFileSync(filename, "utf8").split("\n").slice(1, -1);
  const words = lines.map((line) => line.split("\t")[0]);

  return words;
};

const writeFile = (filename: string, data: string) => {
  fs.writeFileSync(filename, data);
};

const getValidWords = (words: string[]): string[] => {
  const result: string[] = [];
  const validationRegex = new RegExp(`[^a-zåäö]`, "g");

  for (const word of words) {
    if (word.length > 8) continue;

    const lowercase = word.toLowerCase();

    if (validationRegex.test(lowercase)) continue;

    result.push(lowercase);
  }

  return result;
};

const main = () => {
  const words = loadFile("scripts/kotus.txt");
  const validWords = getValidWords(words);
  writeFile("scripts/words.json", JSON.stringify(validWords));
};

main();
