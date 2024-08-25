const Model = require("../models/transaction.model");
const MongooseRepository = require("./repository");

class TransactionRepository extends MongooseRepository {
}

module.exports = new TransactionRepository(Model);