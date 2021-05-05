const KameQuestionRepository = require('../repository/kameQuestion.repository');
const _ = require('lodash');

class kameQuestionPresenter {
    static async getData(query) {
        let q = query && query.q ? query.q : false;
        let obj = {};
        if (q) {
            obj["$or"] = [
                {
                    question: new RegExp(q, "i")
                }, 
                {
                    question_tag: new RegExp(q, "i")
                }
            ]

            
            ;
        }
        
        let process = await KameQuestionRepository.find(obj);
        if (process && process.length) {
            process = _.orderBy(process, ['like'], ['desc']);
        }
        return process
    }

    static async insertData(body) {
        if (!body || !body.question || !body.result) {
            throw new Error('Vui lòng nhập đầy đủ thông tin ');
        }
        let question = body.question;
        let result = body.result;
        let question_tag = change_alias(question);
        let created_time = Math.floor(new Date() / 1000);
        
        let create = await KameQuestionRepository.insert({question, question_tag, result, like: 0, unlike: 0, created_time});

        return create;
    }
    static async like(body) {
        if (!body || !body.id) {
            throw new Error('Vui lòng nhập đầy đủ thông tin ');
        }
        let like = body.like;
        let hasAction = body.hasAction;

        let record = await KameQuestionRepository.findOne({_id: body.id});

        if (!record) throw new Error("record not found");

        if (hasAction) {
            record.like = like && like != 'false'? record.like + 1 : (record.like <= 0 ? 0 : record.like - 1);
            record.unlike = !like || like == 'false' ? record.unlike + 1 : (record.unlike <= 0 ? 0 : record.unlike - 1);
        } else {
            record.like = like ? record.like + 1 : record.like;
            record.unlike = !like ? record.unlike + 1 : record.unlike;
        }

        await record.save();

        return record;
    }
}

const change_alias = (alias) => {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}

module.exports = kameQuestionPresenter;