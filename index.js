const express=require ("express");              //require express.
const app=express();                           //set app via express.
const port=8080;                              //use port -> 8080.  
const path=require("path");

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
        id:null,
        username:"Demo_user",
        content:"Demo_content",
    },
]

//create a route for ------>   /posts
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ports});                // send posts or render ejs files.
})