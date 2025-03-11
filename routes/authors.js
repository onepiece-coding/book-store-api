const express = require("express");
const router = express.Router();
const { verfiyTokenAndAdmin } = require("../middlewares/verfiyToken");
const {
  getAllAuthors,
  getAuthorById,
  addNewAuther,
  updateAuthorById,
  deleteAuthorById,
} = require("../controllers/authorsController");

// /api/authors
router.route("/").get(getAllAuthors).post(verfiyTokenAndAdmin, addNewAuther);

// /api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verfiyTokenAndAdmin, updateAuthorById)
  .delete(verfiyTokenAndAdmin, deleteAuthorById);

module.exports = router;
