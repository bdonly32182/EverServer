const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    Time:{
        type:Date,
        default:Date.now
    },
    CustomerId:{
        type:String,
        index:true
    },
    UserId:String,
    Description:String,
    NameCustomer:String,
    NameUser:String
})
mongoose.model("Log",LogSchema)