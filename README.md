# Book Store API

A fully functional **Book Store API** built with **Node.js**, **Express.js**, and **MongoDB**. This project demonstrates how to create a RESTful API with features like user authentication, data validation, and CRUD operations for managing books in a store.

---

## Features

- **User Authentication**: Secure user registration and login using **JSON Web Tokens (JWT)**.
  
- **Password Hashing**: Passwords are securely hashed using **bcryptjs**.
  
- **Data Validation**: Request data validation using **Joi** and **joi-password-complexity**.
  
- **Error Handling**: Asynchronous error handling with **express-async-handler**.
  
- **Environment Variables**: Manage sensitive data using **dotenv**.
  
- **Database**: MongoDB database integration with **mongoose** for schema modeling.
  
- **Automatic Restarts**: Development server auto-restarts using **nodemon**.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
  
- **Express.js**: Web framework for handling routes and middleware.
  
- **MongoDB**: NoSQL database for storing data.
  
- **Mongoose**: MongoDB object modeling for Node.js.
  
- **JWT**: JSON Web Tokens for user authentication.
  
- **bcryptjs**: Password hashing library.
  
- **Joi**: Data validation library.
  
- **dotenv**: Environment variable management.
  
- **nodemon**: Automatically restarts the server during development.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/onepiece-coding/book-store-api.git
   
   cd book-store-api

2. **Install dependencies**:
      ```bash
      npm install

3. **Set up environment variables**:

- Create a .env file in the root directory.

- Add the following variables:

   ```bash
   MONGo_URI=mongodb://localhost/booksStoreDB
   
   PORT=5000
   
   NODE_ENV=Development
   
   JWT_SECRET_KEY=secretkey
   
   USER_EMAIL=your_gmail
   
   USER_PASS=your_gmail_app_password

4. **Run the server**:
   ```bash
   npm start

## Connect with Me

- YouTube: [OnePiece Coding](https://www.youtube.com/@OnePieceCoding)

- GitHub: [GitHub Profile](https://github.com/onepiece-coding)

- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/lahcen-alhiane-0799ba303/)

Enjoy the project! If you find it helpful, don't forget to give it a ⭐️ on GitHub and share it with others!
   
