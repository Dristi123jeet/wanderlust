const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
 const ExpressError = require("./utils/error.js");
const listings = require("./routes/listing.js") 
const reviews= require("./routes/review.js")
const user= require("./routes/user.js");
const cookie= require('cookie-parser');
const session= require('express-session');
const flash= require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require("./models/user.js")


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie());
const sessiondata= {
  secret: "mysecret",
  resave:false,
  saveUninitialized:true,
  cookie: {
    expires:Date.now() +1000*60*60*24*3,
    maxAge:1000*60*60*24*3,
    httpOnly: true

  }

}
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
app.use(session(sessiondata));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
res.locals.success= req.flash("success");
res.locals.error= req.flash("error");
next();
});

//demo user
// app.get("/demo", async(req,res)=>{
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student"

//   });
//   let registeredUser= await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// })




app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);


app.use((err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.render("error.ejs", { err} );
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});