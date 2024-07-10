import { Icard } from "./card";
import Igamestate from "./state";
import { Ivictory, KtuluVictory } from "./victory";

interface Iplayer {
  fields: Icard[],        // 카드 내는곳
  hands: number,          // 손패 수, 손패 내용은 아직 미구현
  influence: number,      // 세력 수
  deckType: string,       // 덱타입, 승리조건을 위함
  victorys: Ivictory[];   // 승리조건
  sacrifice: number,      // 제물 바친 수
  order: 0 | 1 | 2;       // 순서
}

class player implements Iplayer {
  fields: Icard[];
  hands: number;
  influence: number;
  deckType: string;
  victorys: Ivictory[];
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
        this.victorys.push(new KtuluVictory());
        break;
      // 다른 덱 타입들...
      default:
        throw new Error('Invalid deck type');
    }
  }

  isVictory(state: Igamestate): boolean {
    for (const victory of this.victorys) {
      if (victory.isVictory(state, this)) {
        return true;
      }
    }
    return false;
  }
}

export {Iplayer, player};