const mongoose = require('mongoose');

// 创建连接
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 创建schema 对字段约束
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    tel: {
        type: String,
    },
    avatar: {
        type: String,
    },
    create_time: {
        type: String,
    },
    update_time: {
        type: String,
    }
})

// 创建模型model
const UserModel = mongoose.model('User', UserSchema, 'user')

module.exports = UserModel