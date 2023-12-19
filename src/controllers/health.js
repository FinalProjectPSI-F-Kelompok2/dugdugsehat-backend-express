function getHistory(req, res) {
  const row = req.query.row;
  res.json({
    success: true,
    row: parseInt(row)
  });
}

module.exports.getHistory = getHistory;