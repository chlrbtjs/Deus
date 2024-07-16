import { Socket } from 'socket.io';

interface IUser {
  name: string;
  state: 'Gaming' | 'Mainpage';
  roomId: string;
  gameId: string;
  deckType: string;
  socket: Socket;
}

class User implements IUser {
  name: string;
  state: 'Gaming' | 'Mainpage';
  roomId: string;
  gameId: string;
  deckType: string;
  socket: Socket;

  constructor(socket: Socket, name: string = `Guest`, state: 'Gaming' | 'Mainpage' = 'Mainpage') {
    this.socket = socket;
    this.name = name;
    this.state = state;
    this.roomId = "";
    this.gameId = "";
  }

  joinRoom(roomId: string) {
    this.state = 'Gaming';
    this.roomId = roomId;
    this.socket.join(this.roomId);
  }

  changeDeckType(deckType: string) {
    this.deckType = deckType;
  }
}

export default User;