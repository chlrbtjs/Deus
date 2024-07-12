import player from "./player";

interface Igamestate {
  players: player[],
  turnCount: number,
  currentPlayer: 0 | 1 | 2,
  orderIndex: (0 | 1 | 2)[],

  toJson(): object,
  turnEnd: () => Igamestate,
}

class state implements Igamestate {
  players: player[];
  turnCount: number;
  currentPlayer: 0 | 1 | 2;
  orderIndex: (0 | 1 | 2)[];

  constructor(players: player[], turnCount: number = 0, currentPlayer: 0 | 1 | 2 = 0, orderIndex: (0 | 1 | 2)[] = [0, 1, 2]) {
      this.players = [...players];
      this.turnCount = turnCount;
      this.currentPlayer = currentPlayer; // default to the first player
      this.orderIndex = orderIndex; // default to the first player's order
  }

  toJson(): object {
    return {
      players: this.players.map(player => player.toJson()),
    };
  }

  turnEnd = (): state => {
    let nextState = new state(this.players, this.turnCount + 1, (this.currentPlayer + 1) % 3  as 0 | 1 | 2, [...this.orderIndex.slice(1), this.orderIndex[0]]);

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