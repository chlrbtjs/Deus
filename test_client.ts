import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

const myid = socket.id;


const test1 = () => {
  console.log('test1');
  socket.emit('joinGame', { roomId: '1'});
}
  
socket.on('playerJoined', ( player: string ) => {
  console.log(player);
})

while (true) {
  
}