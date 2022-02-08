const mongodb = require("mongodb");
const db = require("../data/database");

class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  //retrieve data
  static async getTodos() {
    const todo = await db.getDB().collection("todos").find().toArray();

    return todo.map((todo) => {
      return new Todo(todo.text, todo._id);
    });
  }

  //logic of update and insert data
  async save() {
    if (this.id) {
      return await db
        .getDB()
        .collection("todos")
        .updateOne(
          { _id: mongodb.ObjectId(this.id) },
          { $set: { text: this.text } }
        );
    }
    return await db.getDB().collection("todos").insertOne({ text: this.text });
  }

  //delete todos
  async delete() {
    if (!this.id) {
      throw new Error("Trying to delete todo without id");
    }
    return await db
      .getDB()
      .collection("todos")
      .deleteOne({ _id: mongodb.ObjectId(this.id) });
  }
}

module.exports = Todo;
