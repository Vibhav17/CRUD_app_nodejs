const express=require("express");
const app=express();
const port=8080;
const path=require("path")
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
let posts=[
    {
        id:uuidv4(),
        username:"Apnacollege",
        content:"I love Coding!"
    },
    {
        id:uuidv4(),
        username:"Shraddha",
        content:"Hard work is the key to Sucess!"
    },
    {
        id:uuidv4(),
        username:"Vibhav",
        content:"Selected as an Intern at Microsoft"
    }
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let  id=uuidv4();
    posts.push({id,username,content});
   res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
   
    
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
     post.content=newcontent;
     res.redirect("/posts")

})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
  
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // let post=posts.find((p)=>id===p.id);
   posts=posts.filter((p)=>id!=p.id);
   res.redirect("/posts")
})
app.listen(port,()=>{
    console.log("listening on port 8080");
})
