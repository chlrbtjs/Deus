import card from "./card";

interface IDeck {
  deckType: string,
  cards: number[],
  size: number,
  shuffle: () => void,
  draw(): number | undefined,
}

class Deck implements IDeck {
  deckType: string;
  cards: number[];
  size: number;

  constructor(deckType: string, cards: number[]) {
    this.deckType = deckType;
    this.cards = cards;
    this.size = cards.length;
  }

  shuffle(): void {
    for (let i = this.size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  draw(): number | undefined {
    if (this.size === 0) {
      return undefined;
    }
    this.size--;
    return this.cards.pop();
  }
}

export default Deck;