let config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('debug',true)
    const db = mongoose.connect(config.mongoUri,{useNewUrlParser:true,useCreateIndex:true});
    require('../Models/User.Models');
    require('../Models/Customer.Models');
    require('../Models/Logs.Models');
    return db
}