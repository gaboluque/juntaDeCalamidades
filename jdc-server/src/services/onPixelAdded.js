const { errorHandler } = require("../utils/errorHandler");

const onPixelAdded = (socket, Boards) => errorHandler(async ({ x, y, color }) => {
  await Boards.addPixel(x, y, color);
}, socket);

module.exports = { onPixelAdded };