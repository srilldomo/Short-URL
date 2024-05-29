const express = require ("express")
const router = express.Router()
const URL  = require ("../model/url")


router.get("/",async (req,res)=>{
   if(!req.user)return res.redirect("/login")
   const allurl = await URL.find({ createdBy: req.user._id})
   res.render("home",{urls:allurl})
})

router.get("/signup",(req,res)=>{
   res.render("signup")
})
router.get("/login",(req,res)=>{
   res.render("login")
})
module.exports = router