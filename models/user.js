const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const VocabListSchema = new mongoose.Schema({
  name: String,
  definition: String,
});

const DocListSchema = new mongoose.Schema({
  name: String,
  paragraph: String,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, lowercase: true, unique: true },
    password: String,
    VocabList: [VocabListSchema],
    DocList: [DocListSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model("User", userSchema);
