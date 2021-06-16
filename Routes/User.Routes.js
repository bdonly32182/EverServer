const passport = require('passport')
module.exports=(app)=>{
    const user = require('../Controllers/User.Controller');
    const auth = passport.authenticate('jwt',{session:false})
    app.post('/api/login',user.UserLogin);
    app.post('/api/register',user.UserRegister);
    app.get('/api/load/user',auth,user.LoadUser);
}