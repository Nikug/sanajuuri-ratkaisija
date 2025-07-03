import fs from "fs";
import { TrieTree } from "tree";

const loadWords = (): TrieTree => {
  const json = fs.readFileSync("scripts/words.json", "utf8");
  const words = JSON.parse(json);

  const tree = new TrieTree();
  tree.insertMany(words);
  return tree;
};

const main = () => {
  console.log("Loading words...");
  console.time("Load");
  const tree = loadWords();
  console.timeEnd("Load");

  console.time("Word find");
  const foundWords = tree.search("test", 7);
  console.timeEnd("Word find");

  console.log(foundWords);
};

main();
