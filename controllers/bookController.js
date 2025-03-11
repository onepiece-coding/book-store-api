const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");

/**
 * @desc Get All Books
 * @route /api/books
 * @method GET
 * @access public
 */
const getAllBooks = async (req, res) => {
  console.log(req.query);
  const { minPrice, maxPrice } = req.query;
  /**
   * Comparison Query Operator | From MongoDB
   * $eq = equal => find({ price: {$eq : 10} })
   * $ne = not equal => find({ price: {$ne : 10} })
   * $lt = less than => find({ price: {$lt : 10} })
   * $lte = less than or equal => find({ price: {$lte : 10} })
   * $gt = greater than => find({ price: {$gt : 10} })
   * $gte = greater than or equal => find({ price: {$gte : 10} })
   * $in = in array => find({ price: {$in : [8, 9]} })
   * $nin = not in array => find({ price: {$nin : [8, 9]} })
   */
  try {
    let books;

    if (minPrice && maxPrice) {
      books = await Book.find({
        price: { $gte: minPrice, $lte: maxPrice },
      }).populate("author", ["_id", "firstName", "lastName"]);
    } else {
      books = await Book.find().populate("author", [
        "_id",
        "firstName",
        "lastName",
      ]);
    }

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

/**
 * @desc Get Book By ID
 * @route /api/books/:id
 * @method GET
 * @access public
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.status(200).json(book);
  } else {
    res
      .status(404)
      .json({ message: `Book with ID ${req.params.id} not found!` });
  }
});

/**
 * @desc Add New Book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
const addNewBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const savedBook = await book.save();
  res.status(201).json(savedBook);
});

/**
 * @desc Update Book By ID
 * @route /api/books/:id
 * @method PUT
 * @access private (only admin)
 */
const updateBookById = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.price,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedBook);
});

/**
 * @desc Delete Book By ID
 * @route /api/books/:id
 * @method DELETE
 * @access private (only admin)
 */
const deleteBookById = () =>
  asyncHandler(async (req, res) => {
    const findBook = await Book.findById(req.params.id);
    if (findBook) {
      await Book.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Book has been deleted." });
    } else {
      return res.status(404).json({ message: "Book not found!" });
    }
  });

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
};
