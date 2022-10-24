const { errorHandler } = require("../utils/errorHandler");
const { roomName, botName } = require("../utils/constants");

const onJoin = (socket, Users, Messages, Boards) => errorHandler(async ({ username }) => {
  const user = await Users.userJoin(socket.id, username, roomName);

  socket.join(user.room);

  // Get last messages
  const messages = await Messages.getLastMessages(20);
  messages.forEach((message) => {
    socket.emit("message", message);
  });

  // Get board
  const board = await Boards.getBoard();
  socket.emit("board", board.pixels);

  console.log(`User ${user.username} joined the room ${user.room}`);

  // Welcome current user
  socket.emit("welcome", Messages.formatMessage(botName, `Bienvenido, ${username}. Cuéntame por qué sufres?`));

  // Broadcast when a user connects
  socket.broadcast
    .to(user.room)
    .emit(
      "message",
      Messages.formatMessage(botName, `${user.username} se ha unido a la junta`)
    );
}, socket)

module.exports = { onJoin };