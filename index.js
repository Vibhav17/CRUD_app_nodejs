const express=require("express");
const app=express();
const port=8080;
const path=require("path")
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
let posts=[
    {
        username:"Apnacollege",
        content:"I love Coding!"
    },
    {
        username:"Shraddha",
        content:"Hard work is the key to Sucess!"
    },
    {
        username:"Vibhav",
        content:"Selected as Intern at Microsoft"
    }
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.listen(port,()=>{
    console.log("listening on port 8080");
})