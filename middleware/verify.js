const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  //check if there is a token in header
  //if no header, deny the access to the user
  const token = req.header("auth-token");
  if (!token) return res.status(404).send("Access Denied");

  //create
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.json(err);
  }
};

module.exports = verify;
