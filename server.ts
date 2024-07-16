import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import Game from './modules/game';
import { start } from 'repl';
import { IFieldSelectData } from './modules/data';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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

  constructor(socket: Socket, name: string = `Guest ${connectedUsers.size}`, state: 'Gaming' | 'Mainpage' = 'Mainpage') {
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

let connectedUsers: Map<string, User> = new Map();
let games: Map<string, Game> = new Map();


// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.get('/api/games', (req: Request, res: Response) => {
  
});

app.post('/api/games', (req: Request, res: Response) => {
  
});

app.get('/api/games/:roomId', (req: Request, res: Response) => {
  
});

// Socket.IO 이벤트 처리
io.on('connection', (socket: Socket) => {
  console.log(`New client connected ${socket.id}`);
  connectedUsers.set(socket.id, new User(socket));


  socket.on('joinGame', (roomId: string) => {
    if (games.has(roomId) && games.get(roomId)!.playerCount < 3) {
      const game: Game = games.get(roomId)!;                // 바로 위 if문에서 검사됨
      const user: User = connectedUsers.get(socket.id)!;    // connection, disconnect이벤트로 보장됨
      user.joinRoom(roomId);
      game.joinPlayer(socket, user.deckType);
    }
    else {
      const game: Game = new Game(roomId);
      const user: User = connectedUsers.get(socket.id)!;    // connection, disconnect이벤트로 보장됨
      user.joinRoom(roomId);
      game.joinPlayer(socket, user.deckType);
    }
  });

  socket.on('playCard', (cardIndex: number, selectData: IFieldSelectData = { userNumber: 'self', fieldNumber: -1 }) => {
    const id = socket.id;
    const user: User = connectedUsers.get(id)!;
    if (user.state === 'Gaming') {
      const game: Game = games.get(user.gameId)!;
      game.playCard(id, cardIndex, selectData);
    }
    else {
      socket.emit('errorMessage', 'You are not in the game.');
      console.error(`User ${id} tried to play card but is not in the game.`);
    }
  });

  socket.on('disconnect', () => {
    const user: User = connectedUsers.get(socket.id)!;
    if (user.state === 'Gaming') {
      const game: Game = games.get(user.gameId)!;
      // game.leavePlayer(socket.id);
      io.to(user.roomId).emit('playerLeft', { players: game.players });
    }
    connectedUsers.delete(socket.id);
    console.log(`Client disconnected ${socket.id}`);
  });
  
  // socket.on('makeroom', (roomId) => {
    
  // })
});

// 서버 시작
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));