const fs = require('fs').promises;
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, _next) => {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  if (talkers.length === 0) return res.status(200).json(talkers);
  return res.status(200).json(talkers);
});
