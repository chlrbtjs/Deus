import state from "./state"
import { Socket } from "socket.io";

interface IGame {
  players: Map<Socket, 0 | 1 | 2>
  currentPlayer: number,
  state: state,
  room: string,
}

class Game implements IGame {
  players: Map<Socket, 0 | 1 | 2>;
  currentPlayer: number;
  state: state;
  room: string;

  constructor(players: Map<Socket, 0 | 1 | 2>, deckTypes: string[], currentPlayer: number = 0) {
    this.players = players;
    this.currentPlayer = currentPlayer;
    this.state = new state(['A', 'B', 'C']);
  }
}

export default Game;