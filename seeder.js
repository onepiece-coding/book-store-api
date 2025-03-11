const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books, authors } = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();

// Connect To DB
connectToDB();

const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books Imported");
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit connetion to DB
  }
};

const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors Imported");
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit connetion to DB
  }
};

const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books Deleted");
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit connetion to DB
  }
};

const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("Authors Deleted");
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit connetion to DB
  }
};

if (process.argv[2] === "-import_books") {
  importBooks();
} else if (process.argv[2] === "-import_authors") {
  importAuthors();
} else if (process.argv[2] === "-remove_books") {
  removeBooks();
} else if (process.argv[2] === "-remove_authors") {
  removeAuthors();
}
