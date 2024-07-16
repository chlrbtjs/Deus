import player from "./player";
import order from "./order";
import { IFieldSelectData } from "./data";
import cards from "./cards";

interface Igamestate {
  players: player[],
  turnCount: number,
  orderIndex: order[],    // 0, 1, 2 -> 1, 2, 0 -> 2, 0, 1 -> 0, 1, 2
  generalPublic: number,  // 가운데 쌓여있는 신도발사대, TODO: 현재 이 파일에서만 작성됨, 바꿔야 할 부분이 있는지 확인하기

  toJson(): object,
  turnEnd: () => Igamestate,
}

class state implements Igamestate {
  players: player[];
  turnCount: number;
  currentPlayer: order;
  orderIndex: order[];
  generalPublic: number;

  constructor(decks: string[], turnCount: number = 0, currentPlayer: order = 0, orderIndex: order[] = [0, 1, 2], generalPublic: number = 50) {
      this.players = [new player(0, decks[0]), new player(1, decks[1]), new player(2, decks[2])];
      this.turnCount = turnCount;
      this.currentPlayer = currentPlayer; // default to the first player
      this.orderIndex = orderIndex;       // default to the first player's order
      this.generalPublic = generalPublic;
  }

  playCard(usedPlayer: order, cardIndex: number, selectData: IFieldSelectData): state {
    const card = cards.get(this.players[usedPlayer].hands[cardIndex]);
    this.players[usedPlayer].fields.push(card);
    this.players[usedPlayer].hands.splice(cardIndex, 1);

    card.whenOpen.openEffect(this, usedPlayer, selectData);

    return this;
  }

  closeCard(usedPlayer: order, cardIndex: number, selectData: IFieldSelectData): state {
    const card = this.players[usedPlayer].fields[cardIndex];
    this.players[usedPlayer].influence += card.createInfluence;
    this.players[usedPlayer].fields.splice(cardIndex, 1);
    card.whenClose.closeEffect(this, usedPlayer, selectData);

    return this;
  }

  turnEnd = (): state => {
    let nextState = new state([...this.players].map(p => p.deckType), this.turnCount + 1, (this.currentPlayer + 1) % 3  as order, [...this.orderIndex.slice(1), this.orderIndex[0]], this.generalPublic);

    for (const i of this.orderIndex) {
      const p = this.players[i];

      for(const c of p.fields) {
        nextState = c.whenTurnEnd.turnEndEffect(nextState, p.order);
      }
    }

    return nextState;
  };

  toJson(): object {
    return {
      players: this.players.map(player => player.toJson()),
    };
  }
}

export default state;