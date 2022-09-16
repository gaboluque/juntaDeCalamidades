class Boards {

  constructor(db) {
    this.boardCollection = db.collection("board");
    this.init().then(([err, boardId]) => {
      if (err) console.log(err);
      else {
        this.boardId = boardId;
      }
    });
  }

  async init() {
    try {
      const board = await this.getBoard();
      if (!board) {
        const { insertedId } = await this.boardCollection.insertOne({ pixels: [], createdAt: new Date() });
        this.boardId = insertedId;
        return [null, insertedId];
      }
      this.boardId = board._id;
      return [null, board._id];
    } catch (err) {
      throw err;
    }
  }

  async getBoard() {
    return this.boardCollection.findOne({});
  }

  async addPixel(x, y, color) {
    if (!this.boardId) await this.init();
    return this.boardCollection.updateOne({ _id: this.boardId }, { $push: { pixels: { x, y, color } } });
  }

  async clearBoard() {
    if (!this.boardId) await this.init();
    return this.boardCollection.updateOne({ _id: this.boardId }, { $set: { pixels: [] } });
  }
}

module.exports = Boards;