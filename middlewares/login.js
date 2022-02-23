const crypto = require('crypto');

const regex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (email === '' || !email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!email.match(regex)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (password === '' || !password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
}

module.exports = {
  generateToken,
  validateEmail,
  validatePassword,
};
