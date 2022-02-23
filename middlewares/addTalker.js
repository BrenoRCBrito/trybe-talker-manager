const fs = require('fs').promises;
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, _next) => {
  const { name, age } = req.body;
  const { watchedAt, rate } = req.body.talk;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  talkers.push({ id: talkers.length + 1, name, age, talk: { watchedAt, rate } });
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res
    .status(201)
    .json({ id: talkers.length, name, age, talk: { watchedAt, rate } });
});