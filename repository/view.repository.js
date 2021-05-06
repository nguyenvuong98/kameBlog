const models = require('../models');

class ViewRepository {
    static async findOne(query = {}, projection = {}) {
        return await models.view.findOne(query, projection);
    }

    static async create(obj) {
        return await models.view.create(obj);
    }
}
module.exports = ViewRepository;