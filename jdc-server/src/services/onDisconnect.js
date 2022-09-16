const { errorHandler } = require("../utils/errorHandler");
const { botName, roomName } = require("../utils/constants");

const onDisconnect = (socket, Users, Messages) => errorHandler(async () => {
  const user = await Users.userLeave(socket.id);

  if (user) {
    socket.broadcast.emit(
      "message",
      Messages.formatMessage(botName, `${user.username} salió de la junta`)
    );
  }
}, socket);

module.exports = { onDisconnect };