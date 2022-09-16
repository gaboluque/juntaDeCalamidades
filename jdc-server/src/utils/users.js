class Users {
  constructor(db) {
    this.userCollection = db.collection("users");
  }

  findUser(username) {
    return this.userCollection.findOne({ username });
  }

  async userJoin(id, username, room) {

    const user = { id, username, room, status: "ONLINE" };

    const userExists = await this.findUser(username);

    if (userExists && userExists.status === "ONLINE") {
      throw new Error("Usuario ya registrado");
    } else if (userExists && userExists.status === "OFFLINE") {
      await this.userCollection.updateOne({ username }, { $set: { status: "ONLINE" } });
    } else {
      await this.userCollection.insertOne(user);
    }

    return user;
  }

  getCurrentUser(id) {
    return this.userCollection.findOne({ id });
  }

  async userLeave(id) {
    const user = await this.getCurrentUser(id);
    await this.userCollection.updateOne({ id }, { $set: { status: "OFFLINE" } });
    return user;
  }

  disconnectAll() {
    return this.userCollection.updateMany({}, { $set: { status: "OFFLINE" } });
  }
}

module.exports = Users;