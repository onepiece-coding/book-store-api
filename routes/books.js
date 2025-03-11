const express = require("express");
const router = express.Router();
const { verfiyTokenAndAdmin } = require("../middlewares/verfiyToken");
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/bookController");

// /api/books
router.route("/").get(getAllBooks).post(verfiyTokenAndAdmin, addNewBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verfiyTokenAndAdmin, updateBookById)
  .delete(verfiyTokenAndAdmin, deleteBookById);

// router.get("/", getAllBooks);

// router.get("/:id", getBookById);

// router.post("/", verfiyTokenAndAdmin, addNewBook);

// router.put("/:id", verfiyTokenAndAdmin, updateBookById);

// router.delete("/:id", verfiyTokenAndAdmin, deleteBookById);

module.exports = router;
