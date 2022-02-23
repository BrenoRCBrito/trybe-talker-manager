const fs = require('fs').promises;
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const talker = talkers.find((t) => t.id === Number(id));
  if (talker) return res.status(200).json(talker);
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});
