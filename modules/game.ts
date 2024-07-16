import state from "./state"
import { Socket } from "socket.io";
import { IFieldSelectData } from "./data";
import User from "./user"
import order from "./order";

interface IUserIngame {
  deckType: string;
  socket: Socket;
}

interface IGame {
  users: Map<string, IUserIngame>;
  orders: Map<string, order>;
  state: state;
  roomId: string;
  playerCount: number;
}

class Game implements IGame {
  // server.ts와 관련된것들
  gameId: string;
  roomId: string;
  isWaiting: boolean;
  playerCount: number;
  
  users: Map<string, IUserIngame>;
  orders: Map<string, order>;
  
  // 인게임
  state: state;
  currentPlayer: string;

  constructor(roomId: string) {
    this.users = new Map<string, IUserIngame>();
    this.orders = new Map<string, order>();
    this.roomId = roomId;
    this.isWaiting = true;
  }

  gameStart() {
    this.isWaiting = false;
    this.state = new state([...this.users.values()].map(u => u.deckType));
    // 순서 정하기
    // 멀리건
    // users 상태 변경하기
    // etc..
  }

  joinPlayer(socket: Socket, user: IUserIngame) {
    this.users.set(socket.id, user);
    this.playerCount++;

    if (this.playerCount === 3) {
      this.gameStart();
    }
  }

  playCard(usedPlayerId: string, cardIndex: number, selectData: IFieldSelectData): void {
    this.state = this.state.playCard(this.orders.get(usedPlayerId)!, cardIndex, selectData);

    this.update();
  }

  closeCard(usedPlayerId: string, cardIndex: number, selectData: IFieldSelectData): void {
    this.state = this.state.closeCard(this.orders.get(usedPlayerId)!, cardIndex, selectData);

    this.update();
  }

  update() {
    for (const [key, user] of this.users.entries()) {
      user.socket.emit('update', this.state.toJson);
    }
  }
}

export default Game;