const express = require("express");
// const booksPath = require("./routes/books");
// const authorsPath = require("./routes/authors");
// const authPath = require("./routes/auth");
// const usersPath = require("./routes/users");
const logger = require("./middlewares/logger");
// const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errors");
const connectToDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

// dotenv.config();
require("dotenv").config();

// Connect To DB
connectToDB();

// Init App
const app = express();

// Static Folder | Get request for images
app.use(express.static(path.join(__dirname, "images")));

// Apply Middlewares
app.use(express.json()); // JSON to JS Object
app.use(express.urlencoded({ extended: false })); // form data = urlencoded

app.use(logger);

// CORS Polycy
app.use(
  cors({
    origin: "frontend",
    // origin: "*",
  })
);

// helmet
app.use(helmet());

// Set view engine
app.set(
  "view engine",
  "ejs"
); /* {"message":"No default engine was specified"} */

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));

// Not Found Handler Middleware
app.use(notFound);
// Error Handler Middleware
app.use(errorHandler);

// Run The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on ${process.env.NODE_ENV} Mode port ${PORT}`)
);
