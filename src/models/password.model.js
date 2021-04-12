const passwordValidator = require('password-validator');
const stringUtils = require('../utils/string.utils')
const lodash = require('lodash');

const MIN_PASSWORD = 8

const schema = new passwordValidator()
  .is().min(MIN_PASSWORD)
  .has().uppercase()
  .has().digits()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123'])

module.exports = {
  async validatePassword(password, password_confirmation) {
    let errors = []

    if (stringUtils.isEmpty(password)) {
      errors.push({
        "label": "password",
        "description": "A senha é obrigatória."
      })
    } else {
      result = schema.validate(password, { list: true });

      for (const err of result) {
        switch (err) {
          case 'min':
            errors.push({
              "label": "password",
              "description": `A senha precisa ter no mínimo ${MIN_PASSWORD} caracteres.`
            })
            break

          case 'uppercase':
            errors.push({
              "label": "password",
              "description": `A senha precisa ter pelo menos um caractere maiúsculo.`
            })
            break

          case 'digits':
            errors.push({
              "label": "password",
              "description": `A senha precisa ter pelo menos um caractere numérico.`
            })
            break

          case 'spaces':
            errors.push({
              "label": "password",
              "description": `A senha não pode conter espaços.`
            })
            break

          default:
            errors.push({
              "label": "password",
              "description": "Senha inválida."
            })
        }
      }

      const errorResults = lodash.isEmpty(result)

      if (errorResults && password !== password_confirmation) {
        errors.push({
          "label": "password_confirmation",
          "description": "Confirmação de Senha diferente do informado no campo Senha."
        })
      }

      return errors
    }
  }
}