
const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const{v4:uuidv4}=require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));



let posts=[{
    id:uuidv4(),
    username:"apna college",
    content:"i love coding"
},
{
    id:uuidv4(),
username:"gctc",
content:"college near cheeryal"
},
{
    id:uuidv4(),
    username:"123",
    content:"CRUD project"
}
];

//start-post 
app.get("/posts",(req,res)=>
{
    
     res.render("index.ejs",{posts});
});
//end


//start-new post
app.get("/posts/new",(req,res)=>
{
    res.render("new.ejs")
})



//new post post
app.post("/posts",(req,res)=>
{
let {username,content} =req.body;
let id=uuidv4();
posts.push({id,username,content});
res.redirect("/posts");
});


//start-post/id
app.get("/posts/:id",(req,res)=>
{
    let {id} = req.params;
    let post=posts.find((p)=> id==p.id);
 res.render("show.ejs",{post});
});
//end

app.patch("/posts/:id",(req,res)=>
{
    
    let {id} = req.params;
    let newContent= req.body.content;
    let post=posts.find((p)=> id==p.id);
    post.content= newContent;
    res.redirect("/posts");
});

//start-to edit with specific id
app.get("/posts/:id/edit",(req,res)=>
{
    let {id} = req.params;
    let post=posts.find((p)=> id==p.id);
    res.render("edit.ejs",{post});

});

app.delete("/posts/:id",(req,res)=>
{
    let {id} = req.params;
   posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");

});


app.listen(port,()=>
{
    console.log(`listening to port ${port}`);
})