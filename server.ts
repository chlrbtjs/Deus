import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import Game from './modules/game';
import { start } from 'repl';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

interface IRoom {
  id: string;
  members: Socket[],

  addMember: (socket: Socket) => void;
}

interface IallGames {
  rooms: IRoom[];
  games: Map<IRoom, Game>;
}

class Room implements IRoom {
  id: string;
  members: Socket[] = [];

  constructor(id: string) {
    this.id = id;
  }

  addMember = (socket: Socket): void => {
    this.members.push(socket);
  }
}

class allGames implements IallGames {
  rooms: IRoom[] = [];
  games: Map<IRoom, Game> = new Map<IRoom, Game>();

  startGame = (room: IRoom, deckTypes: string[]): void => {
    const game = new Game(new Map<Socket, 0 | 1 | 2>([[room.members[0], 0], [room.members[1], 1], [room.members[2], 2]]), deckTypes);
    this.games.set(room, game);
    room.members.forEach(member => member.emit('gameStart'));
  }
}

let allgames = new allGames();
let roomof = new Map<string, Room>();

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

  socket.on('joinRoom', (roomId: string) => {
    let room = allgames.rooms.find(r => r.id === roomId);
    if (room) {
      socket.join(roomId);
      roomof.set(socket.id, room);
      room.addMember(socket);
    } else {
      socket.join(roomId);
      room = new Room(roomId);
      roomof.set(socket.id, room);
      room.addMember(socket);
      allgames.rooms.push(room);
    }

    if (room.members.length === 3) {
      allgames.startGame(room, ['A', 'B', 'C']);
      //TODO, 게임 시작 시유저 정보를 저장할 수 있는 클래스 생성, joinRoom신호를 받을때 덱 타입을 받아서 저장, ['A', 'B', 'C']을 고치기
    }
  });

  // socket.on('disconnect', () => {
  //   const playerData = gameState.players.get(socket.id);
  //   if (playerData) {
  //     const { roomId } = playerData;
  //     const room = gameState.rooms.get(roomId);
  //     if (room) {
  //       room.players = room.players.filter(p => p.id !== socket.id);
  //       if (room.players.length === 0) {
  //         gameState.rooms.delete(roomId);
  //       } else {
  //         io.to(roomId).emit('playerLeft', { players: room.players });
  //       }
  //     }
  //     gameState.players.delete(socket.id);
  //   }
  //   console.log('Client disconnected');

  // });
  
  socket.on('makeroom', (roomId) => {
    
  })
});

// 서버 시작
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));