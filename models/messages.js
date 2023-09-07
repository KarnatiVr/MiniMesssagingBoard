const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Message = mongoose.model('Message',messageSchema);
module.exports=Message;