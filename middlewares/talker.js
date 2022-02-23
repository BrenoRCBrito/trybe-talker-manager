const fs = require('fs').promises;
const rescue = require('express-rescue');

const DATE_REGEX = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

function authorize(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
  return res.status(401).json({
    message: 'Token não encontrado',
  }); 
  }
  if (authorization.length < 16) {
  return res.status(401).json({
    message: 'Token inválido',
  }); 
  }
  next();
}

function verifyTalkerName(req, res, next) {
  const { name } = req.body;
  if (name === '' || !name) {
 return res.status(400).json({
    message: 'O campo "name" é obrigatório',
  }); 
}
  if (name.length < 3) {
 return res.status(400).json({
    message: 'O "name" deve ter pelo menos 3 caracteres',
  }); 
}
next();
}

function verifyTalkerAge(req, res, next) {
  const { age } = req.body;
  if (age === '' || !age) {
 return res.status(400).json({
  message: 'O campo "age" é obrigatório',
}); 
}
  if (age < 18) {
 return res.status(400).json({
  message: 'A pessoa palestrante deve ser maior de idade',
}); 
}
next();
}

function verifyTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
 return res.status(400).json({
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  }); 
}

next();
}

function verifyWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;
  
if (!watchedAt || watchedAt === '') {
  return res.status(400).json({
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  });
}
if (!DATE_REGEX.test(watchedAt)) {
  return res.status(400).json({
   message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
 }); 
 }
next();
}

function verifyRate(req, res, next) {
  const { rate } = req.body.talk;
  const nRate = Number(rate);
  if (!rate || rate === '') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (nRate < 1 || nRate > 5) {
    return res.status(400).json({
     message: 'O campo "rate" deve ser um inteiro de 1 à 5',
   }); 
   }

next();
}

const addTalker = rescue(async (req, res, _next) => {
  const { name, age } = req.body;
  const { watchedAt, rate } = req.body.talk;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  talkers.push({ id: talkers.length + 1, name, age, talk: { watchedAt, rate } });
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(201).json({ id: talkers.length, name, age, talk: { watchedAt, rate } });
});

module.exports = { authorize,
verifyTalkerAge,
verifyTalk,
verifyWatchedAt,
verifyRate,
verifyTalkerName,
addTalker };