const express = require("express");
const router = express.Router();
const {
  verfiyTokenAdminAndUserHimSelf,
  verfiyTokenAndAdmin,
} = require("../middlewares/verfiyToken");
const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/usersController");

// /api/users
router.get("/", verfiyTokenAndAdmin, getAllUsers);

// /api/users/:id
router
  .route("/:id")
  .get(verfiyTokenAdminAndUserHimSelf, getUserById)
  .put(verfiyTokenAdminAndUserHimSelf, updateUser)
  .delete(verfiyTokenAdminAndUserHimSelf, deleteUser);

module.exports = router;
