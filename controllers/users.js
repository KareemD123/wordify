const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  savedWord,
};

async function savedWord(req, res) {
  console.log("I hit the savedWord function in express");
  console.log(JSON.stringify(req.body));
  const doc = await User.findOne({ email: "kareem_draz@hotmail.com" });
  await doc.save({ VocabList: `${req.body}` });

  const savedWord = new User(req.body);
  savedWord.save();
  return res.json(req.body);
}

async function signup(req, res) {
  console.log(
    "this is the signup function req.body: " + JSON.stringify(req.body)
  );
  const user = new User(req.body);
  try {
    await user.save();
    // TODO: Send back a JWT instead of the user
    const token = createJWT(user);
    console.log(token);
    console.log("i made it this far!");
    res.json({ token });
  } catch (err) {
    console.log("this is the catch err" + err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

function createJWT(user) {
  console.log("thisis the jwt secret" + SECRET);
  return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}
