const { errorHandler } = require("../utils/errorHandler");

const onChatMessage = (socket, Users, Messages) => errorHandler(async ({ message, color }) => {
  console.log("Chat message received");
  const user = await Users.getCurrentUser(socket.id);

  const msg = Messages.formatMessage(user.username, message, color);


  const msgId = await Messages.newMessage(msg);

  socket.emit("message", { ...msg, _id: msgId.toString() });
  socket.broadcast.emit("message", { ...msg, _id: msgId.toString() });
}, socket)

module.exports = { onChatMessage };