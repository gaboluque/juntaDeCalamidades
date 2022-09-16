const { errorHandler } = require("../utils/errorHandler");

const onChatMessage = (socket, Users, Messages) => errorHandler(async ({ message, color }) => {
  const user = await Users.getCurrentUser(socket.id);
  const msg = Messages.formatMessage(user.username, message, color);

  await Messages.newMessage(msg);

  socket.emit("message", msg);
  socket.broadcast.emit("message", msg);
}, socket)

module.exports = { onChatMessage };