const Logs = require('mongoose').model("Log")
const User = require('mongoose').model("User");
const Customer = require('mongoose').model("Customer")
const FetchsLogs = async(req,res)=>{
    const {Role} = req.user
    if (Role === "admin") {
        const logs = await Logs.find({})
        return res.status(200).send(logs);
    }
    return res.status(401).send()
}
const FetchLog = async(req,res) => {
    const {Role} = req.user
    const target = req.params.logId
    if (Role === "admin") {
        const log = await Logs.findOne({_id:target})
        const user = await User.findOne({_id:log.UserId});
        const customer = await Customer.findOne({_id:log.CustomerId})
        return res.status(200).send({log , user , customer });
    }
    return res.status(401).send()
}

module.exports = {
    FetchLog,
    FetchsLogs
}