const express=require ("express");              //require express.
const app=express();                           //set app via express.
const port=8080;                              //use port -> 8080.  
const path=require("path");
const { v4: uuidv4 } = require("uuid");
const method_override=require('method-override');

// middleware important.
app.use(method_override('_method'));
app.use(express.urlencoded({extended:true}));               // use to decript the input or

app.listen(port,()=>{
    console.log(`Port is listening at ${port}`);            // print the port status.
}); 

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
});

// create a route for new posts ------>     /posts/new

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    // console.log(username,content);          //check   ok
    let id=uuidv4();
    // console.log(id);                        //check   ok
    posts.push({id,username,content});
    res.redirect("/posts");
});

// create a route to show individual posts ------>      /posts/:id

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);                    // check    ok
    let post=posts.find((p)=> id === p.id);
    // console.log(post);                  // check    ok
    res.render("show.ejs",{post});
});

// create some random id to make the posts diff from each.
// use npm's uuid package.

// create a update path use patch or put method ------->       /posts/:id

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newCont=req.body.content;
    let post=posts.find((p)=>id === p.id);
    // console.log(post);
    // console.log("content before patch", post.content);
    // console.log("new content for patch",newCont);
    post.content=newCont;
    // console.log("content after patch",post.content);
    res.redirect("/posts");
})

// create a edit route for all posts ------->        /posts/:id/edit

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

// create a destroy route to delete the posts -------->         /posts/:id

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts=posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
});

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})