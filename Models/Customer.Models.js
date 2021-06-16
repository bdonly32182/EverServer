const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    PersNo:String,
    Fname:String,
    Lname:String,
    Address:String,
    Status: String,
    UserId:{
        type:String
    },
    pathPDF:String
})
mongoose.model("Customer",CustomerSchema)