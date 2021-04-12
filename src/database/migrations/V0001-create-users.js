exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
      table.increments("id").primary()
      table.string("name").notNullable()
      table.string("email").notNullable()
      table.string("password_hash", 255).notNullable()
  })
};
exports.down = knex => { }