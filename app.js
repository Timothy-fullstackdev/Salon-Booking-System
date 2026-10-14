const express = require("express");
const app = express();
const multer = require("multer");
const uploads = ({dest: "uploads/"});
const cors = require("cors")// allowa the browsre to talk to the server

app.use(express.json());
app.use(cors());

// connect a database
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Salon-Booking-System")
.then(()=> {
    console.log(`mongo database is connected`)
})

.catch((error)=> {
    console.log("error", error.message)
})


//mongo bluePrint
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
});
// mongo model talks with db via express
const User = mongoose.model("User", userSchema);

//express routes

app.post("/users", async (req,res)=> {
const user = await User.create(req.body);
res.json(user);
})

//get single user
app.get("/users/:id", async (req,res)=> {
    const userId = req.params.id;
    const user = await User.findById(userId);

    res.json(user)
})
// get all users
app.get("/users", async (req,res)=> {
    const users = await User.find();
    res.json(users)
})
//delete all users
app.delete("/users", async(req,res)=> {
    const deleteUsers = await User.deleteMany();
    res.json(deleteUsers);
})

//POST SCHEMA
const postSchema = mongoose.Schema({
    content: String,
    userId: String
})

const Post = mongoose.model("Post", postSchema);

// create post
app.post("/posts", async (req,res)=> {
const post = await Post.create(req.body);
res.json(post)
})

//get post one post
app.get("/posts/:id", async (req,res)=> {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    const user = await User.findById(post.userId)
    res.json({
        post: post, // return post
        user: user // return user who posted it
    })
})

//get all post
app.get("/posts", async (req,res)=> {
    const posts = await Post.find();

//find post with users and map each post to the browser
const postWithUsers = await Promise.all(
    posts.map(async(post)=> {
        const user = await User.findById(post.userId) //return id for every user

        return{
            post: post, //return every promised post
            user: user //return promised user
        }
    })
);
    res.json(postWithUsers)
})

//delete all posts
app.delete("/posts", async (req,res)=> {
    const deletedPosts = await Post.deleteMany();
    res.json(deletedPosts)
})


//login Logic
//find the user loging in
app.post("/login", async(req,res)=> {
const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
})

res.json(user);
})


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`our application is running`)
})