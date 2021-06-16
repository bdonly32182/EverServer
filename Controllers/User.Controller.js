const User = require('mongoose').model('User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');
const UserRegister = async(req,res) => {
    const {Email,Password} = req.body
    console.log(req.body);
    let HaveUser = await User.findOne({Email:Email});
    if(HaveUser) return res.status(400).send()
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err
        bcrypt.hash(Password,salt,(err,PassEncript)=>{
            if(err) throw err
            let user = new User({...req.body,Password:PassEncript});
            user.save()
                .then((result) => {
                    res.status(200).send({msg:"Register Success"});
                }).catch((err) => {
                    res.status(400).send({msg:'Register Fail'});
                });
        })
    })
}

const UserLogin = async(req,res)=>{
    const {Email,Password} = req.body
    let user = await User.findOne({Email:Email});
    if(!user) return res.status(400).send();
    bcrypt.compare(Password,user.Password,(err,isMath)=>{
        if(err) throw err
        if(!isMath) return res.status(400).send();
        jwt.sign({
                Email:user.Email,
                UserId:user._id,
                Role:user.Role,
                Fname:user.Fname,
                Lname:user.Lname,
                Picture:user.Picture
            },config["jwtSecret"],{expiresIn:"1days" },
            (err,token)=>{
                if(err) throw err
                res.status(200).send({
                    token,
                    user
                })
        })
    })
}
const LoadUser = async(req,res)=>{
    if (req.user) {
        return res.status(200).send({user:req.user})
    }
    return res.status(200).send({user:null})
}
module.exports = {
    UserRegister,
    UserLogin,
    LoadUser
}