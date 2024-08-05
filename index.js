const express=require ("express");              //require express.
const app=express();                           //set app via express.
const port=8080;                              //use port -> 8080.  
const path=require("path");
const { v4: uuidv4 } = require("uuid");

app.listen(port,()=>{
    console.log(`Port is listening at ${port}`);            // print the port status.
});

app.use(express.urlencoded({extended:true}));               // use to decript the input or 

app.set("view engine","ejs");                               // set the view engine.

// the main file are at views folder.

app.set("views",path.join(__dirname,"views"));                  // set the views folder.
app.use(express.static(path.join(__dirname,"public")));         // set the local files. 

// Check server

// app.get("/",(req,res)=>{
//     res.send("Server working well !");
// });

// create a dummy server.
let posts=[
    {
        id:uuidv4(),
        username:"Demo_user",
        content:"Demo_content",
    },
]

//create a route for all posts ------>   /posts

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});                // send posts or render ejs files.
})

// create a route for new posts ------>     /posts/new

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

// create a route to show individual posts ------>      /posts/:id

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})

// create some random id to make the posts diff from each.
// use npm's uuid package.