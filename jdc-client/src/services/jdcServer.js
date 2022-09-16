import axios from "axios";
import { io } from "socket.io-client";


export const serverUrl = "http://192.168.0.6:3001";

export const getBoard = async () => {
  try {
    const res = await axios.get(`${serverUrl}/board`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addPixel = async (x, y, color) => {
  try {
    const res = await axios.post(`${serverUrl}/board/pixel`, { x, y, color });
    return res.status === 201;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const connectToSocket = () => {
  const newSocket = io(serverUrl);
  newSocket.connect();

  return newSocket;
}