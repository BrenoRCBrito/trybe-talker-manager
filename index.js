const express = require('express');
const bodyParser = require('body-parser');
const showTalkers = require('./middlewares/showTalkers');
const getTalker = require('./middlewares/getTalker');
const { validateEmail, validatePassword, generateToken } = require('./middlewares/login');
const { authorize, verifyTalkerAge,
   verifyTalkerName, addTalker,
     verifyTalk, verifyWatchedAt, verifyRate } = require('./middlewares/talker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', showTalkers);

app.get('/talker/:id', getTalker);

app.post('/login', validateEmail, validatePassword, (req, res, _next) =>
  res.status(200).json({ token: generateToken() }));

app.post('/talker', authorize, 
verifyTalkerName, verifyTalkerAge, verifyTalk, verifyWatchedAt, verifyRate, addTalker);

app.put('/talker/:id', authorize, 
verifyTalkerName, verifyTalkerAge, verifyTalk, verifyWatchedAt, verifyRate, editTalker);

app.delete('/talker/:id', authorize, deleteTalker);