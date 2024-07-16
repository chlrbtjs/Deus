import player from "./player";

interface Igamestate {
  players: player[],
  turnCount: number,
  currentPlayer: 0 | 1 | 2,
  orderIndex: (0 | 1 | 2)[],
  generalPublic: number, // 가운데 쌓여있는 신도발사대, TODO: 현재 이 파일에서만 작성됨, 바꿔야 할 부분이 있는지 확인하기

  toJson(): object,
  turnEnd: () => Igamestate,
}

class state implements Igamestate {
  players: player[];
  turnCount: number;
  currentPlayer: 0 | 1 | 2;
  orderIndex: (0 | 1 | 2)[];
  generalPublic: number;

  constructor(decks: string[], turnCount: number = 0, currentPlayer: 0 | 1 | 2 = 0, orderIndex: (0 | 1 | 2)[] = [0, 1, 2], generalPublic: number = 0) {
      this.players = [new player(0, decks[0]), new player(1, decks[1]), new player(2, decks[2])];
      this.turnCount = turnCount;
      this.currentPlayer = currentPlayer; // default to the first player
      this.orderIndex = orderIndex; // default to the first player's order
      this.generalPublic = generalPublic;
  }

  toJson(): object {
    return {
      players: this.players.map(player => player.toJson()),
    };
  }

  turnEnd = (): state => {
    let nextState = new state([...this.players].map(p => p.deckType), this.turnCount + 1, (this.currentPlayer + 1) % 3  as 0 | 1 | 2, [...this.orderIndex.slice(1), this.orderIndex[0]], this.generalPublic);

    for (const i of this.orderIndex) {
      const p = this.players[i];

      for(const c of p.fields) {
        nextState = c.whenTurnEnd.turnEndEffect(nextState, p.order);
      }
    }

    return nextState;
  };
}

export default state;