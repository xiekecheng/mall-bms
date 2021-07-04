const mongoose = require('mongoose');

// 创建连接
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 创建schema 对字段约束
const GoodsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    introduce: String,
    img: String,
    readnum: Number,
    manyImg: String,
    description: String

})

// 创建模型model
const GoodsModel = mongoose.model('goods', GoodsSchema, 'goods')

module.exports = GoodsModel