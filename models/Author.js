const mongoose = require("mongoose");
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 200,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  { timestamps: true } // createdAt | updatedAt
);

const Author = mongoose.model("Author", AuthorSchema);

function validateCreateAuthor(obj) {
  return Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(2).max(100).required(),
    image: Joi.string(),
  }).validate(obj);
}

function validateUpdateAuthor(obj) {
  return Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(2).max(100),
    image: Joi.string(),
  }).validate(obj);
}

module.exports = { Author, validateCreateAuthor, validateUpdateAuthor };
