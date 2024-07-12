import card from "./card";
import state from "./state";
import victory from "./victory";
import { KtuluVictory } from "./victorys";

interface Iplayer {
  fields: card[],         // 카드 내는곳
  hands: number,          // 손패 수, 손패 내용은 아직 미구현
  influence: number,      // 세력 수
  deckType: string,       // 덱타입, 승리조건을 위함
  victorys: victory[];    // 승리조건, 승리 조건들을 하나씩 체크하고 자신의 isWin를 true로 바꿈
  sacrifice: number,      // 제물 바친 수
  order: 0 | 1 | 2,       // 순서
  isWin: boolean,         // 승리 여부

  toJson(): object,
}

class player implements Iplayer {
  fields: card[];
  hands: number;
  influence: number;
  deckType: string;
  sacrifice: number;
  isWin: boolean;
  order: 0 | 1 | 2;

  victorys: victory[];

  constructor(order: 0 | 1 | 2, deckType: string) {
    this.fields = [];
    this.hands = 1;
    this.influence = 0;
    this.sacrifice = 0;
    this.deckType = deckType;
    this.order = order;
    this.isWin = false;

    this.setVictory();
  }

  private setVictory(): void {
    switch (this.deckType) {
      case 'Ktulu':
        this.victorys.push(new KtuluVictory());
        // this.victorys.push(new AVictory());
        // this.victorys.push(new BVictory());
        break;
      // 다른 덱 타입들...
      default:
        throw new Error('Invalid deck type');
    }
  }

  isVictory(state: state): void {
    for (const victory of this.victorys) {
      victory.isVictory(state, this);
    }
    return;
  }

  toJson(): object {
    return {
      fields: this.fields.map(card => card.toJson()),
      hands: this.hands,
      influence: this.influence,
      deckType: this.deckType,
      sacrifice: this.sacrifice,
      order: this.order,
      isWin: this.isWin,
    };
  }
}

export default player;