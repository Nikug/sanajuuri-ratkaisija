export interface TreeNode {
  character: string;
  nodes: TreeNode[];
  isWord: boolean;
}

const characters = "abcdefghijklmnopqrstuvwxyzåäö";

export class TrieTree {
  private root: TreeNode = { character: "", nodes: [], isWord: false };

  public insertMany(words: string[]): void {
    for (const word of words) {
      this.insert(word);
    }
  }

  public insert(word: string): void {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const index = characters.indexOf(char);
      if (node.nodes[index]) {
        node = node.nodes[index];
      } else {
        node.nodes[index] = { character: char, nodes: [], isWord: i === word.length - 1 };
        node = node.nodes[index];
      }
    }
  }

  public search(word: string, wordLength: number, resultLimit: number = -1): string[] {
    const chars = word.split("");
    let node = this.root;
    const result: string[] = [];

    for (const char of chars) {
      const index = characters.indexOf(char);
      if (!node.nodes[index]) return result;
      node = node.nodes[index];
    }

    this.walk(node, chars.slice(0, -1), result, wordLength, resultLimit);

    return result;
  }

  private walk(
    node: TreeNode,
    path: string[],
    results: string[],
    wordLength: number,
    resultLimit: number
  ): void {
    // Base case
    if (
      !node ||
      (resultLimit !== -1 && results.length >= resultLimit) ||
      path.length > wordLength
    ) {
      return;
    }

    // Pre recurse
    path.push(node.character);

    if (node.isWord && path.length === wordLength) {
      results.push(path.join(""));
    }

    // Recurse
    for (const child of node.nodes) {
      if (child) {
        this.walk(child, path, results, wordLength, resultLimit);
      }
    }

    // Post recurse
    path.pop();
  }
}
