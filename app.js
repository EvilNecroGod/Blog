const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

//connecting to database
// mongoose.connect("mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}${process.env.HOST_DB}/Blog",{useNewUrlParser: true});

mongoose.connect(`mongodb+srv://vinaykumarsagar:${process.env.PASS_DB}@cluster0.cxgtc82.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser: true});


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const posts = [];

// new postSchema

const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

// model for postSchema

const Post = mongoose.model("Post",postSchema);




//landing page
app.get("/",function(req,res){
  // finding all posts 
  Post.find({}).then((posts)=>{
    res.render("home",{homeContent: homeStartingContent, postData: posts});
  })
  
});

//about page
app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutContent});
});

//contact page
app.get("/contact",function(req,res){
  res.render("contact",{contactInfo: contactContent});
});

//compose page
app.get("/compose",function(req,res){
  res.render("compose");
});

//visiting a custom blog page
app.get("/posts/:postId",function(req,res){
  
  // const givenValue = _.lowerCase(req.params.postName);
  // const for storing postid

  const requestedPostId = req.params.postId;
  
  Post.findOne({_id: requestedPostId}).then((post)=>{
    res.render("post",{postTitle: post.title,postContent: post.content})
  }).catch((err)=>{
    console.log(err);
  })
  
  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
  //   if(storedTitle===givenValue){
  //     res.render("post",{postTitle: post.title,postContent: post.content})
  //   }
  // })
});

//posting the data from compose page
app.post("/compose",function(req,res){
  const post = new Post({
    title : req.body.composeTitle,
    content : req.body.composePost
  })
  post.save().then(()=>{
    res.redirect("/");
  })
  .catch((err)=>{
    console.log(err)
  })
});



//starting a server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
