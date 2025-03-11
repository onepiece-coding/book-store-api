const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt | updatedAt
);

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

const User = mongoose.model("User", UserSchema);

function validateRegisterUser(obj) {
  return Joi.object({
    email: Joi.string().trim().min(5).max(100).email().required(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: passwordComplexity().required(),
  }).validate(obj);
}

function validateLoginUser(obj) {
  return Joi.object({
    email: Joi.string().trim().min(5).max(100).email().required(),
    password: Joi.string().trim().min(6).required(),
  }).validate(obj);
}

function validateUpdateUser(obj) {
  return Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    username: Joi.string().trim().min(2).max(200),
    password: joiPasswordComplexity(),
  }).validate(obj);
}

function validateChangePassword(obj) {
  return Joi.object({
    password: joiPasswordComplexity(),
  }).validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateChangePassword,
};
