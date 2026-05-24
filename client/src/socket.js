import { io } from "socket.io-client";

const socket = io("https://dildar.onrender.com");

export default socket;

// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000', {
//   transports: ['websocket'],
//   autoConnect: true,
// });

// export default socket;
