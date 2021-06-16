process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const mongoose = require('./Config/mongoose');
const express = require('./Config/express')
let db = mongoose();
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT ,()=>{
    console.log(`Server running on Port : ${PORT}`);
})
