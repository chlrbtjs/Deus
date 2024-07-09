import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 타입 정의
interface Player {
  id: string;
  name: string;
}

interface Room {
  id: string;
  players: Player[];
  state: 'waiting' | 'playing';
}

interface GameState {
  rooms: Map<string, Room>;
  players: Map<string, { roomId: string; name: string }>;
}

interface JoinRoomData {
  roomId: string;
  playerName: string;
}

interface MakeMoveData {
  roomId: string;
  move: any; // 실제 게임에 맞게 타입을 정의해야 합니다
}

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 게임 상태 관리
const gameState: GameState = {
  rooms: new Map<string, Room>(),
  players: new Map<string, { roomId: string; name: string }>()
};

// 라우트 설정
app.get('/api/games', (req: Request, res: Response) => {
  const games = Array.from(gameState.rooms.values());
  res.json(games);
});

app.post('/api/games', (req: Request, res: Response) => {
  const { roomId, playerName } = req.body;
  if (gameState.rooms.has(roomId)) {
    return res.status(400).json({ error: 'Room already exists' });
  }
  gameState.rooms.set(roomId, { id: roomId, players: [], state: 'waiting' });
  res.status(201).json({ message: 'Game created', roomId });
});

app.get('/api/games/:roomId', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = gameState.rooms.get(roomId);
  if (!room) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(room);
});

// Socket.IO 이벤트 처리
io.on('connection', (socket: Socket) => {
  console.log(`New client connected ${socket.id}`);

  socket.on('joinRoom', ({ roomId, playerName }: JoinRoomData) => {
    const room = gameState.rooms.get(roomId);
    if (room && room.players.length < 2) {
      socket.join(roomId);
      room.players.push({ id: socket.id, name: playerName });
      gameState.players.set(socket.id, { roomId, name: playerName });
      io.to(roomId).emit('playerJoined', { players: room.players });
      
      if (room.players.length === 2) {
        room.state = 'playing';
        io.to(roomId).emit('gameStart', { state: room.state });
      }
    } else {
      socket.emit('joinError', { message: 'Unable to join room' });
    }
  });

  socket.on('makeMove', ({ roomId, move }: MakeMoveData) => {
    const room = gameState.rooms.get(roomId);
    if (room && room.state === 'playing') {
      // 게임 로직 처리
      // ...

      io.to(roomId).emit('moveMade', { playerId: socket.id, move });
    }
  });

  socket.on('disconnect', () => {
    const playerData = gameState.players.get(socket.id);
    if (playerData) {
      const { roomId } = playerData;
      const room = gameState.rooms.get(roomId);
      if (room) {
        room.players = room.players.filter(p => p.id !== socket.id);
        if (room.players.length === 0) {
          gameState.rooms.delete(roomId);
        } else {
          io.to(roomId).emit('playerLeft', { players: room.players });
        }
      }
      gameState.players.delete(socket.id);
    }
    console.log('Client disconnected');

  });
  
  socket.on('makeroom', (roomId) => {
    if (gameState.rooms.has(roomId)) {
      
    }
    else {
      gameState.rooms.set(roomId, { id: roomId, players: [], state: 'waiting' });
    }
  })
});

// 서버 시작
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));