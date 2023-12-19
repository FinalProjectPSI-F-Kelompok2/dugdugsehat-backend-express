const prisma = require('../model/connection');
const encryptor = require('../utils/encrypt');
const jwt = require('jsonwebtoken');


async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if (!await encryptor.verifyPassword(password, user.password) || user.email == null) {
    res.status(403);
    res.json({
      success: false,
      message: "invalid credentials"
    });
    return;
  }

  // Login success, create JWT
  const signedToken = jwt.sign({
    user_id: user.id,
    email: email
  },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "6h"
    }
  )
  res.json({
    success: true,
    user_id: user.id,
    token: signedToken,
  });
}

async function register(req, res) {
  const { email, name, password } = req.body;
  const hashedPwd = await encryptor.encryptPassword(password);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPwd,
      profile: {
        create: {
          name: name
        }
      }
    }
  })
  res.status((user) ? 200 : 503);
  res.json({
    'success': user != undefined
  })
}

module.exports.login = login;
module.exports.register = register;