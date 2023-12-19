const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const requestToken = (req.headers['Authorization'.toLowerCase()]);
    if (!requestToken) throw new Error("Invalid or unknown token.")
    // Perform routes when authenticated
    const jwtResult = jwt.verify(requestToken.slice('Bearer '.length), process.env.TOKEN_SECRET);
    res.locals.jwt = jwtResult;
    next()
  } catch (err) {
    res.status(403);
    res.json({
      success: false,
      message: err.message
    })
    return;
  }
}

module.exports = authenticate;