const db = require("../data/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};

function find() {
  const userInfo = {}
  return db("students as s")
  .select(
        "s.lastname as lastname",
        "s.firstname as firstname",
        "p.id as project_id",
        "p.project as project",
        "p.due_date as due_date")
    .leftJoin("projects as p", "p.student_id", "=", "s.id")
  }

function findBy(filter) {
  return db("projects")
  .where(filter);
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function add(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => find(id));
}

function update(id, changes) {
  return db("projects")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del();
}