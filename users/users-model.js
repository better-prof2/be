const db = require('../data/dbConfig')


module.exports = {
    find,
    findBy,
    findById,
    findUserMessages,
    findUserInfo,
    add,
    update,
    remove
  };
  
  function find() {
    return db("users as u")
    .select("u.id as id", "u.lastname as lastname", "u.firstname as firstname", "u.email as email")
  }
  
  function findBy(filter) {
    return db("users")
      .where(filter)
      .first();
  }
  
  function findById(id) {
    return db("users")
      .where("id", id)
      .first();
  }
  
  function findUserMessages(userId) {
    return db("users as u")
    .select("u.lastname as lastname", "u.firstname as firstname", "m.message as message", "m.created_at as time_of_message_sent", "m.updated_at as time_of_message_update", "m.student_id as student_id")
    .join("messages as m", "m.professor_id", "=", "u.id")
    .where("professor_id", userId);
  };
  
  function findUserInfo(userId) {
    return db("students as s")
    .select("s.lastname as lastname", "s.firstname as firstname", "s.email as email", "s.id as student_id")
    .join("users as u", "s.professor_id", "=", "u.id")
    .where("s.professor_id", userId)
  };
  
  async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  }
  
  function update(id, changes) {
    return db("users")
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db("users")
      .where({ id })
      .del();
  }