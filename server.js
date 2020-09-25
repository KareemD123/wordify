const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
require("./config/database");
const bodyParser = require("body-Parser");
// const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/*", function (req, res) {
  console.log(req.body);
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "wordify",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// app.use(passport.initialize());
// app.use(passport.session());

app.get("/failed", (req, res) => res.send("You failed to log in"));
app.get("/good", (req, res) => res.send(`Welcome ${req.user.email}`));

// app.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/plus.login",
//       ,
//       "https://www.googleapis.com/auth/plus.profile.emails.read",
//     ],
//   })
// );

// app.get(
//   "/callback",
//   passport.authenticate("google", {
//     successRedirect: "/good",
//     failureRedirect: "/failed",
//   })
// );

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

const port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
