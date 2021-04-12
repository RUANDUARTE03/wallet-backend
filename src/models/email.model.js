const connection = require("../database/connection")
const stringUtils = require('../utils/string.utils')
const lodash = require("lodash")

let REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  async validateEmail(email) {
    let errors = []
    
    if (stringUtils.isEmpty(email)) {
      errors.push({
        "label": "email",
        "description": "O email é obrigatório."
      })
    } else {
      if (!REGEX_EMAIL.test(email)) {
        errors.push({
          "label": "email",
          "description": "O email é inválido."
        })
      } else {
        const emailDuplicate = await connection("users").where("email", email).first()

        if (!lodash.isEmpty(emailDuplicate)) {
          errors.push({
            "label": "email",
            "description": "Este email já existe na base de dados."
          })
        }
      }
    }

    return errors
  }
}