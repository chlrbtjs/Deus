import player from "./player";

interface Igamestate {
  players: player[],

  toJson(): object,
}

class state implements Igamestate {
  players: player[];

  constructor(players: player[]) {
      this.players = [...players];
  }

  toJson(): object {
    return {
      players: this.players.map(player => player.toJson()),
    };
  }
}

export default state;