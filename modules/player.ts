import { Icard } from "./card";
import Igamestate from "./state";
import { Ivictory, KtuluVictory } from "./victory";

interface Iplayer {
  fields: Icard[],
  hands: number,
  influence: number,
  deckType: string,
  isAchieved: Ivictory;
  sacrifice: number,
  order: 0 | 1 | 2;
}

class player implements Iplayer {
  fields: Icard[];
  hands: number;
  influence: number;
  deckType: string;
  isAchieved: Ivictory;
  sacrifice: number;
  order: 0 | 1 | 2;

  constructor(order: 0 | 1 | 2, deckType: string) {
    this.fields = [];
    this.hands = 1;
    this.influence = 0;
    this.sacrifice = 0;
    this.deckType = deckType;
    this.order = order;

    this.setVictory();
  }

  private setVictory(): void {
    switch (this.deckType) {
      case 'Ktulu':
        this.isAchieved = new KtuluVictory();
        break;
      // 다른 덱 타입들...
      default:
        throw new Error('Invalid deck type');
    }
  }

  isVictory(state: Igamestate): boolean {
    return this.isAchieved.isVictory(state, this);
  }
}

export {Iplayer, player};