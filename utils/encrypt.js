const bcrypt = require('bcryptjs');

module.exports.encryptPassword = (password) => {
  return bcrypt.genSalt(10)
  .then((salt) => bcrypt.hash(password, salt))
  .then(hash => hash)
  .catch(err => err);
}

module.exports.verifyPassword = (password, hashPwd) => {
  return bcrypt.compare(password, hashPwd)
  .then(correct => correct);
}