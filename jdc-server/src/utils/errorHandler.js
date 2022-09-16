function errorHandler(fn, socket) {
  return async (...args) => {
    try {
      await fn(...args);
    } catch (error) {
      console.log("ERROR", { error });
      if (socket) socket.emit("error", error.message);
    }
  }
}

module.exports = {
  errorHandler
}