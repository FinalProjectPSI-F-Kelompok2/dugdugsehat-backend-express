const express = require('express');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const requestToken = (req.headers['Authorization'.toLowerCase()]);
    if (!requestToken) {
      res.status(403);
      res.json({
        success: false,
        message: "Invalid or unknown token."
      })
      return;
    }
    // Perform routes when authenticated
    const jwtResult = jwt.verify(requestToken.slice('Bearer '.length), process.env.TOKEN_SECRET);
    next()
  } catch (_) {
    res.status(403);
    res.json({
      success: false,
      message: "Invalid or unknown token."
    })
    return;
  }
}

module.exports = authenticate;