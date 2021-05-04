const models = require('../models');

class KameQuestionRepository {
    static async findOne(query = {}, projection = {}) {
        return await models.kameQuestion.findOne(query, projection);
    }
    
    static async find(query = {}, projection = {}) {
        return await models.kameQuestion.find(query, projection);
    }
    static async insert(obj) {
        if (!obj) return;
        return await models.kameQuestion.create(obj);
    }
}

module.exports = KameQuestionRepository;