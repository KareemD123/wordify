const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  savedWord,
  vocabList,
  savedDoc,
  docList,
  deleteWord,
  deleteDoc,
};

// make decode model and export it

async function deleteDoc(req, res) {
  console.log("I hit the savedWord function in express");
  // console.log(JSON.stringify(req.body));
  // console.log(
  //   "this is the request headers" + JSON.stringify(req.headers.authorization)
  // );
  let token = req.headers.authorization;
  var decoded = jwt.decode(token);
  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.payload.user.email);
  const userEmail = decoded.payload.user.email;
  const data = req.body;
  const modelUser = await User.findOne({ email: userEmail });
  console.log("this is the data " + data.id);
  let name = data.id;
  let nameStr = name.toString();
  let paragraph = data.paragraph;
  let nameIndex = modelUser.DocList.map((i) => i.name).indexOf(name);
  modelUser.DocList = modelUser.DocList.filter(function (array) {
    var x = data.id;
    return array.name !== x;
  });
  // console.log("this is the modelUser " + modelUser);
  // modelUser.DocList.push({
  //   name: data.docName,
  //   paragraph: data.paragraph[0],
  // });
  modelUser.save((error) => {
    if (error) return error;
    return res.send();
  });
  console.log("this is the overall user " + modelUser);
  return res.json({ hello: "hello" });
}

async function deleteWord(req, res) {
  console.log("I hit the deleteWord function in express");
  console.log(JSON.stringify(req.body));
  let token = req.headers.authorization;
  var decoded = jwt.decode(token);
  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.payload.user.email);
  const userEmail = decoded.payload.user.email;
  const data = req.body;
  const modelUser = await User.findOne({ email: userEmail });
  console.log("this is the data " + data.id);
  let name = data.id;
  let nameStr = name.toString();
  let definition = data.definition;
  let nameIndex = modelUser.VocabList.map((i) => i.name).indexOf(name);
  modelUser.VocabList = modelUser.VocabList.filter(function (array) {
    var x = data.id;
    return array.name !== x;
  });

  modelUser.save((error) => {
    if (error) return error;
    return res.send();
  });
  console.log("this is the overall user " + modelUser.VocabList);
  return res.json(req.body);
}

async function docList(req, res) {
  console.log("i hit the DocList");
  let token = req.headers.authorization;
  var decoded = jwt.decode(token);
  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.payload.user.email);
  const userEmail = decoded.payload.user.email;
  const modelUser = await User.findOne({ email: userEmail });
  let listOfDocs = modelUser.DocList;
  console.log(listOfDocs);
  return res.json(listOfDocs);
}

async function savedDoc(req, res) {
  console.log("I hit the savedWord function in express");
  // console.log(JSON.stringify(req.body));
  // console.log(
  //   "this is the request headers" + JSON.stringify(req.headers.authorization)
  // );
  let token = req.headers.authorization;
  var decoded = jwt.decode(token);
  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.payload.user.email);
  const userEmail = decoded.payload.user.email;
  const data = req.body;
  const modelUser = await User.findOne({ email: userEmail });
  console.log("this is the modelUser " + modelUser);
  console.log("this is the data paragraph " + data.textparagraph);
  modelUser.DocList.push({
    name: data.docName,
    paragraph: data.textparagraph,
  });
  modelUser.save((error) => {
    if (error) return error;
    return res.send();
  });
  console.log("this is the overall user " + modelUser);

  return res.json(req.body);
}

async function vocabList(req, res) {
  console.log("i hit the vocabList");
  let token = req.headers.authorization;
  var decoded = jwt.decode(token);
  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.payload.user.email);
  const userEmail = decoded.payload.user.email;
  const modelUser = await User.findOne({ email: userEmail });
  let listOfWords = modelUser.VocabList;
  console.log(listOfWords);
  return res.json(listOfWords);
}

async function savedWord(req, res) {
  console.log("I hit the savedWord function in express");
  console.log(JSON.stringify(req.body));
  console.log(
    "this is the request headers" + JSON.stringify(req.headers.authorization)
  );
  let token = req.headers.authorization;
  var decoded = jwt.decode(token);
  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.payload.user.email);
  const userEmail = decoded.payload.user.email;
  // const doc = await User.findOne({ email: "kareem_draz@hotmail.com" });

  const data = req.body;
  const modelUser = await User.findOne({ email: userEmail });
  console.log("this is the modelUser " + modelUser);
  modelUser.VocabList.push({ name: data.id, definition: data.definition[0] });
  modelUser.save((error) => {
    if (error) return error;
    return res.send();
  });
  console.log("this is the overall user " + modelUser);
  console.log(
    "this is the vocablist array in users " + modelUser.VocabList[0].name
  );

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
