const passport = require('passport');
const {Strategy,ExtractJwt} = require('passport-jwt');
const User = require('mongoose').model('User');
const config = require('../Config/config');
const option = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.jwtSecret
}
const JWTStrategy = new Strategy(option,async(payload,done)=>{
    const targetUser = await User.findOne({Email:payload.Email});
    if (targetUser) {
        done(null,targetUser)
    } else {
        done(null,false)
    }
});
passport.use('jwt',JWTStrategy);