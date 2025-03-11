const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

/**
 * @desc Get All Authors
 * @route /api/authors
 * @method GET
 * @access public
 */
module.exports.getAllAuthors = async (req, res) => {
  try {
    // const authorsList = await Author.find()
    //   .sort({ firstName: -1 })
    //   .select("firstName lastName _id");

    console.log(req.query);
    const { pageNumber, authorsPerPage } = req.query;
    const authorsList = await Author.find()
      .skip((pageNumber - 1) * authorsPerPage)
      .limit(authorsPerPage);

    res.status(200).json(authorsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

/**
 * @desc Get Author By ID
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
module.exports.getAuthorById = asyncHandler(async (req, res) => {
  const foundedAuthor = await Author.findById(req.params.id);
  if (foundedAuthor) {
    res.status(200).json(foundedAuthor);
  } else {
    res
      .status(404)
      .json({ message: `Author with ID "${req.params.id}" not found!` });
  }
});

/**
 * @desc Add New Author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
module.exports.addNewAuther = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });
  const addedAuthor = await author.save();
  res.status(201).json(addedAuthor);
});

/**
 * @desc Update Author By ID
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
module.exports.updateAuthorById = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedAuthor = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true } // Return the new updated author. Not the old one
  );
  res.status(200).json(updatedAuthor);
});

/**
 * @desc Delete Author By ID
 * @route /api/authors/:id
 * @method DELETE
 * @access private (only admin)
 */
module.exports.deleteAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Author has been deleted." });
    } else {
      return res.status(404).json({ message: "Author not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
