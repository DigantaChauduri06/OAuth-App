require('./config/db')();
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const User = require('./model/user');
require('./passport-config');
const app = express();

app.set("view engine", "ejs");
app.use(
  cookieSession({
    name: "OAuth-season",
    keys: ["keys1", "keys2"],
    maxAge: 24 * 60 * 60 * 1000
  })
);
app.use(passport.initialize());
app.use(passport.session());
//coustom middlewere
const isLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/',(req,res,next)=> {
    res.status(200).render('login');
});

app.get("/failed", (req, res, next) => {
  res.send("failed");
});

app.get("/success",isLoggedin, (req, res, next) => {
  res.render("home");
});


// Google sign in
app.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);
//Facebook sign in
app.get(
  "/facebook",
  passport.authenticate("facebook")
);

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", { successRedirect:'/success', failureRedirect: "/" }),
  (req, res) => {
    console.log('callback');
    res.redirect("/success");
  }
);
//GitHub sign in
app.get("/github", passport.authenticate("github"));

app.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/success",
    failureRedirect: "/failed",
  }),
  (req, res) => {
    console.log("callback");
    res.redirect("/success");
  }
);

app.get("/logout", (req, res, next) => {
  req.session = null;
  req.logOut();
  res.redirect("/");
});


app.listen(4000,()=> console.log('App is running'));
/*
  facebook app id: 621575719122646
  facebook app secrect: ce54845b74b049a3fe134e94c75c718a
*/