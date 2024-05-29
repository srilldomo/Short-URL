const express = require("express");
const app = express();
const UserRouter = require("./route/url");
const { ConnectToMongoDB } = require("./connection/url");
const  {restritedUserOnly,checkauth} = require("./Middlewear/user")
const StaticRouter = require ("./route/staticRouter")
const  cookieparser= require ("cookie-parser")
const router  = require("./route/User")
const path = require ("path")
const PORT = 3000;

//Connection
ConnectToMongoDB("mongodb://localhost:27017/URLS").then(() => {
  console.log("MongoDB Connected to successfully");
});

//How to the set the ejs engine
app.set('view engine',"ejs")
app.set("views", path.resolve("./views"))

//Middlewear
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())
// app.get("/test",async (req,res)=>{
//     const Allurl =  await URL.find({})
//     return res.render("home",{
//        urls: Allurl
//     })
// })

app.use("/url",restritedUserOnly, UserRouter);
app.use("/",checkauth,StaticRouter)
app.use("/user",router)
 

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
