exports.up = async function(knex, Promise) {
  await knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl.string("lastname", 128).notNullable();
      tbl.string("firstname", 128).notNullable();
      tbl.string("username", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl
        .string("email", 128)
        .notNullable()
        .unique();
      tbl.string("role").defaultTo("user");
    })
    .createTable("students", tbl => {
      tbl.increments();
      tbl.string("lastname", 128).notNullable();
      tbl.string("firstname", 128).notNullable();
      tbl.string("username", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl
        .string("email", 128)
        .notNullable()
        .unique();
      tbl
        .integer("professor_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.text("project", 128).notNullable();
      tbl
        .integer("professor_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("student_id")
        .notNullable()
        .references("id")
        .inTable("students")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .date("due_date")
        .notNullable()
        .defaultTo("2021-01-01");
    })

    .createTable("messages", tbl => {
      tbl.increments();
      tbl
        .text("message")
        .notNullable()
        .unique();
      tbl
        .integer("professor_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("student_id")
        .notNullable()
        .references("id")
        .inTable("students")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("info", tbl => {
      tbl.increments();
      tbl
        .integer("student_id")
        .notNullable()
        .references("id")
        .inTable("students")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("professor_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("professor_message")
        .references("id")
        .inTable("messages")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("student_message")
        .references("id")
        .inTable("messages")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = async function(knex, Promise) {
  await knex.schema
    .dropTableIfExists("info")
    .dropTableIfExists("messages")
    .dropTableIfExists("projects")
    .dropTableIfExists("students")
    .dropTableIfExists("users");
}