const mongoose = require("mongoose");

module.exports = class MongooseRepository {

    /**
     * 
     * @param {mongoose.Model} model 
     */
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const d = new this.model(data);
        return await d.save();
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async findWhere(pattern) {
        return await this.model.find(pattern);
    }

    async findOneWhere(pattern) {
        return await this.model.findOne(pattern);
    }
    
    async deleteWhere(pattern) {
        return await this.model.deleteMany(pattern);
    }
}