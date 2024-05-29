// const {v4:uuidv4} = require ("uuid")
const {SetUser} = require ("../Service/auth")
const User = require("../model/User") 


async function HandleSignup  (req,res){
 const {name,email,password} = req.body  
 
 await User.create({
    name,
    email,
    password
 })
 return res.redirect("/")
}
async function HandleLogin  (req,res){
 const {email,password} = req.body  
 const user =  await User.findOne({email,password})
 if(!user)return res.render("login",{error:"Inavlid UserName Are Password"})
 
 const token = SetUser(user);
 
//  res.cookie("uid",token)
 
 return  res.json({token:token})
 
}

module.exports = {HandleSignup,HandleLogin}