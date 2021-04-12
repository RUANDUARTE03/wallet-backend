const lodash = require("lodash")
const userModel = require("../models/user.model")

module.exports = {
  async create(req, res) {
    const validadeUserBeforeInsert = await userModel.validate(req.body)

    if (!lodash.isEmpty(validadeUserBeforeInsert)) {
      return res.status(404).json({ erro: true, errors: validadeUserBeforeInsert })
    }

    const user = await userModel.insert(req.body)

    res.status(200).json(user)
  }
}