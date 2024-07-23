import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import Game from './modules/game';
import { start } from 'repl';
import { IFieldSelectData } from './modules/data';
import User from './modules/user';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // 개발 중에는 모든 출처를 허용합니다. 프로덕션에서는 특정 도메인으로 제한하세요.
    methods: ["GET", "POST"]
  }
}); // 클라이언트가 웹 브라우저가 아니라면 {} 필요 없음

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
  const roomId = req.params.roomId;
  console.log(roomId);
  console.log(games);
  console.log(games.has(roomId));
  console.log(games.get(roomId));
  if (games.has(roomId)) {
    const game: Game = games.get(roomId)!;
    console.log(game);
    res.json({game: game.state?.toJson()});
  }
  else {
    res.status(404).json({ message: 'Game not found' });
  }
});

// Socket.IO 이벤트 처리
io.on('connection', (socket: Socket) => {
  console.log(`New client connected ${socket.id}`);
  connectedUsers.set(socket.id, new User(socket));


  socket.on('joinGame', (roomId: string) => {
    console.log(`User ${socket.id} joined game ${roomId}`);
    if (games.has(roomId) && games.get(roomId)!.playerCount < 3) {
      const game: Game = games.get(roomId)!;                // 바로 위 if문에서 검사됨
      const user: User = connectedUsers.get(socket.id)!;    // connection, disconnect이벤트로 보장됨
      user.joinRoom(roomId);
      game.joinPlayer(socket, user);
      io.to(roomId).emit('playerJoined', user.name);
    }
    else if ( games.has(roomId) ) {
      socket.emit('errorMessage', 'Game is full');
    }
    else {
      const game: Game = new Game(roomId);
      const user: User = connectedUsers.get(socket.id)!;    // connection, disconnect이벤트로 보장됨
      user.joinRoom(roomId);
      game.joinPlayer(socket, user);
      io.to(roomId).emit('playerJoined', user.name);
      games.set(roomId, game);
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

  socket.on('closeCard', (cardIndex: number, selectData: IFieldSelectData) => {
    const id = socket.id;
    const user: User = connectedUsers.get(id)!;
    if (user.state === 'Gaming') {
      const game: Game = games.get(user.gameId)!;
      game.closeCard(id, cardIndex, selectData);
    }
    else {
      socket.emit('errorMessage', 'You are not in the game.');
      console.error(`User ${id} tried to close card but is not in the game.`);
    }
  });

  socket.on('disconnect', () => {
    const user: User = connectedUsers.get(socket.id)!;
    if (user.state === 'Gaming') {
      const game: Game = games.get(user.gameId)!;
      // game.leavePlayer(socket.id);
      io.to(user.roomId).emit('playerLeft');
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