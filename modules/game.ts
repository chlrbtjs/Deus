import state from "./state"
import { Socket } from "socket.io";

interface IGame {
  players: string[], // list of socket ids
  currentPlayer: number,
  state: state,
  room: string,
}

class Game implements IGame {
  players: string[];
  currentPlayer: number;
  state: state;
  room: string;

  constructor() {
    
  }
}

export default Game;