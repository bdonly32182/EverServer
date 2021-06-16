const passport = require('passport')
module.exports=(app)=>{
    const auth = passport.authenticate('jwt',{session:false});
    const Log = require('../Controllers/Logs.Controller');
    app.get('/api/list/logs',auth,Log.FetchsLogs);
    app.get('/api/log/:logId',auth,Log.FetchLog);
}