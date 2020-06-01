const db = require("../data/dbConfig")

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("messages")
}

function findBy(filter) {
  return db("messages")
    .select("*")
    .where(filter)
}

function findById(id) {
  return db("messages")
    .where({ id })
    .first()
}

function add(message) {
  return db("messages")
    .insert(message, "id")
    .then(([id]) => find(id))
}

function update(id, changes) {
  return db("messages")
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db("messages")
    .where({ id })
    .del()
}