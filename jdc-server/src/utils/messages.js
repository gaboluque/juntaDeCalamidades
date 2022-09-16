const moment = require('moment');


class Messages {

  constructor(db) {
    this.msgCollection = db.collection("messages");
  }

  getLastMessages(quantity) {
    return this.msgCollection.find().sort({ createdAt: 1 }).limit(quantity);
  }

  newMessage(message) {
    return this.msgCollection.insertOne({ ...message, createdAt: new Date() });
  }

  formatMessage(username, text, color) {
    return {
      username,
      text,
      color,
      time: moment().format('h:mm a')
    };
  }
}

module.exports = Messages;
