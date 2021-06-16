const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    Email:{
        type:String ,
        unique:true,
        index: true
    },
    Password:String,
    Fname:String,
    Lname:String,
    Picture:String,
    Role:String
})
mongoose.model("User",UserSchema);