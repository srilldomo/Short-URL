const {GetUser} = require ("../Service/auth") 


async function restritedUserOnly(req,res,next){
const UserUid = req.headers["authorization"]

if(!UserUid)return res.redirect("/login")
const token = UserUid.split("Bearer ")[1]
const user = GetUser(token)
if(!user)return res.redirect("/login")


req.user = user
next()
}

async function checkauth (req,res,next){
    // const UserUid = req.cookies?.uid; 
    const UserUid = req.headers["authorization"]
    const token = UserUid.split("Bearer")[1]

    const user = GetUser(token) 
    
    req.user = user
    next()

}
module.exports = {restritedUserOnly,checkauth}