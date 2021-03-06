//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = [{
  subject: "Home",
  content: homeStartingContent
}];

const app = express();
const port = 5000;

// Server Setup

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(port, function() {
  console.log("Server started on port " + port);
});

// '/'

app.get("/", function(req, res) {
  res.render("home", {
    posts: posts
  });
});

// '/about'

app.get("/about", function(req, res) {
  res.render("about", {
    content: aboutContent
  });
});

// '/contact'

app.get("/contact", function(req, res) {
  res.render("contact", {
    content: contactContent
  });
});

// '/compose'

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  // build the post object
  const post = {
    subject: req.body.postSubject,
    content: req.body.postContent
  }

  // add post to list
  posts.push(post);

  // take the user back to the home page
  res.redirect("/");
});

// '/posts/:postID'

app.get("/posts/:postID", function(req, res) {
  const requestedPost = req.params.postID;
  const kebabRequest = _.kebabCase(_.toLower(requestedPost));

  const matchingPost = posts.find(post => _.kebabCase(_.toLower(post.subject)) === kebabRequest);
  if (matchingPost) {
    console.log("Match found!");
    res.render("post", {
      postSubject: matchingPost.subject,
      postContent: matchingPost.content
    });
  } else {
    console.log("No matches?...");
    res.redirect("/");
  }
});
