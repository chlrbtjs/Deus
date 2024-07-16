import state from "./state"
import { Socket } from "socket.io";
import { IFieldSelectData } from "./data";

interface IGame {
  players: Map<string, 0 | 1 | 2>;
  currentPlayer: number;
  state: state;
  roomId: string;
  playerCount: number;
}

class Game implements IGame {
  gameId: string;
  roomId: string;
  isWaiting: boolean;

  players: Map<string, 0 | 1 | 2>;
  sockets: Map<string, Socket>;
  deckTypes: Map<string, string>;
  
  state: state;
  currentPlayer: number; // state로 넘기기
  playerCount: number;   // 동일

  constructor(roomId: string) {
    this.players = new Map<string, 0 | 1 | 2>();
    this.currentPlayer = 0;
    this.roomId = roomId;
    this.isWaiting = true;
  }

  gameStart() {
    this.isWaiting = false;
    // 순서 정하기
    // 멀리건
    // users 상태 변경하기
    // etc..
  }

  joinPlayer(socket: Socket, decksType: string) {
    this.sockets.set(socket.id, socket);
    this.players.set(socket.id, this.playerCount as 0 | 1 | 2);
    this.deckTypes.set(socket.id, decksType);
    this.playerCount++;

    if (this.playerCount === 3) {
      this.gameStart();
    }
  }

  playCard(usedPlayerId: string, cardIndex: number, selectData: IFieldSelectData): void {
    // 로직

    this.update();
  }

  update() {
    for (const [key, socket] of this.sockets.entries()) {
      socket.emit('update', this.state.toJson);
    }
  }
}

export default Game;