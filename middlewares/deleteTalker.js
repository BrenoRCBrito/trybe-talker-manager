const rescue = require('express-rescue');
const fs = require('fs').promises;

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('./talker.json', JSON.stringify(filteredTalkers));
  return res.status(204).end();
});