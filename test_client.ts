import { Interface } from "readline";
import { io } from "socket.io-client";

interface Player {
  id: string;
  name: string;
}

interface Room {
  id: string;
  players: Player[];
  state: 'waiting' | 'playing';
}

const socket = io('http://localhost:3000');

const myid = socket.id;

socket.emit('aa');

socket.emit('makeroom', '1');

socket.emit('joinRoom', { roomId: '1', playerName: `${myid}`});


socket.on('playerJoined', ( players: Player[] ) => {
  console.log(players);
})