const fs = require('fs').promises;
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, _next) => {
  const { q } = req.query;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  if (!q || q === '') return res.status(200).json(talkers);
  const searchedTalker = talkers.filter((talker) => talker.name.includes(q));
  if (searchedTalker) return res.status(200).json(searchedTalker);
  return res.status(200).json([]);
});
