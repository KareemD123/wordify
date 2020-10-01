const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

/*---------- Public Routes ----------*/
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.post("/savedWord", usersCtrl.savedWord);
router.post("/deleteWord", usersCtrl.deleteWord);
router.post("/deleteDoc", usersCtrl.deleteDoc);
router.post("/savedDoc", usersCtrl.savedDoc);
router.post("/vocabList", usersCtrl.vocabList);
router.post("/docList", usersCtrl.docList);

/*---------- Protected Routes ----------*/

module.exports = router;
