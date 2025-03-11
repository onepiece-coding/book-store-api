const jwt = require("jsonwebtoken");

function verfiyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded; // payload => {id, isAdmin}
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token!" });
    }
  } else {
    res.status(401).json({ message: "No token provided!" });
  }
}

function verfiyTokenAdminAndUserHimSelf(req, res, next) {
  verfiyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403) // forbidden
        .json({
          message: "You are not allowed!",
        });
    }
  });
}

function verfiyTokenAndAdmin(req, res, next) {
  verfiyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403) // forbidden
        .json({
          message: "You are not allowed! Only admin allowed.",
        });
    }
  });
}

module.exports = {
  verfiyToken,
  verfiyTokenAdminAndUserHimSelf,
  verfiyTokenAndAdmin,
};
