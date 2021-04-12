const connection = require("../database/connection")
const bcrypt = require("bcrypt")
const lodash = require("lodash")
const stringUtils = require("../utils/string.utils")
const passwordModel = require("./password.model")
const emailModel = require("./email.model")

module.exports = {
  async insert(user) {
    const password_hash = bcrypt.hashSync(user.password, 12)
    
    const u = await connection("users").insert({
      email: user.email,
      name: user.name,
      password_hash
    }).returning("id")

    const userID = await this.getById(parseInt(u[0]))

    return userID
  },

  async getById(id) {
    const user = await connection("users").where("id", id).first()

    return user
  },

  async validate(user) {
    let errors = lodash.union(
      await this.validateName(user.name),
      await emailModel.validateEmail(user.email),
      await passwordModel.validatePassword(user.password, user.password_confirmation)
    )

    return errors
  },

  async validateName(name) {
    let errors = []

    if (stringUtils.isEmpty(name)) {
      errors.push({
        "label": "name",
        "description": "O nome é obrigatório."
      })
    }

    if (!stringUtils.isEmpty(name) && name.length < 4) {
      errors.push({
        "label": "name",
        "description": "O nome precisa ter no mínimo de 4 caracteres."
      })
    }

    if (name.length >= 40) {
      errors.push({
        "label": "name",
        "description": "O nome precisa ter no máximo de 40 caracteres."
      })
    }

    return errors
  },
}