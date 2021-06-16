const express = require('express')
const cors = require('cors')
module.exports = ()=>{
    const app = express();
    global.__basedir = __dirname + "/..";
    require('../Middlewares/Passport')
    app.use(cors());
    app.use(express.urlencoded({extended:true}))
    app.use(express.json({limit:'50mb'}))
    app.use(express.static('public'))
    require('../Routes/Customer.Routes')(app);
    require('../Routes/Logs.Routes')(app);
    require('../Routes/User.Routes')(app)
    return app
}