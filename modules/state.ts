import player from "./player";

interface Igamestate {
  players: player[],
}

class state implements Igamestate {
  players: player[];

  constructor(players: player[]) {
      this.players = [...players];
  }
}

export default state;