const rescue = require('express-rescue');
const fs = require('fs').promises;

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const { watchedAt, rate } = req.body.talk;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const editedTalkers = talkers.map((talker) => {
    if (talker.id === Number(id)) return { id: Number(id), name, age, talk: { watchedAt, rate } };
    return talker;
  });
  await fs.writeFile('./talker.json', JSON.stringify(editedTalkers));
  return res.status(200).json({ id: Number(id), name, age, talk: { watchedAt, rate } });
});
