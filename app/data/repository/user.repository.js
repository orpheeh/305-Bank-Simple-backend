const userModel = require("../models/user.model");
const MongooseRepository = require("./repository");

class UserRepository extends MongooseRepository {
}

module.exports = new UserRepository(userModel);