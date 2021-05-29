const User = require('../models/user')
const {errorHandler} = require("../helpers/dbErrorHandler")
const jwt = require('jsonwebtoken') // to generate signed token
const expressJwt = require('express-jwt') // to authenicate check


module.exports.signup = (req,res) =>{
    //console.log('req.body', req.body)
    const user = new User(req.body)

    user.save((err, user) =>{
        if(err){
            return res.status (400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
          user
        })
    })

};

module.exports.signin = (req, res ) =>{

    //find the user based on email
    const {email, password} = req.body
    User.findOne({email}, (err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error:" User with that email does not exist"
            });
        }
        // if the user is found make sure the email and password match
        // create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }
        //generate a signed token user id and secret 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //presist the token as 't' in cookie with expiry date 
        res.cookie('t', token, {expire: new Date() + 9999})
        // return with user and token to frontend client
        const{_id, name ,email, role} = user
        return res.json({token,user:{_id,email,name, role}}) 
    })

};

module.exports.signout = (req,res) => {
    res.clearCookie('t');
    res.json({
        message: "Signout success"
    })
};

exports.requireSignin = expressJwt({
    secret: "qwerty",
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

module.exports.isAuth = (req,res,next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if(!user){
            return res.status(403).json({
                error: "Access Denied"
            });
        }

    next();
};

module.exports.isAdmin = (req,res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "admin resource ! Acess denied"
        })
    }
    next();
};

