const prisma = require("../model/connection");
const { MEASURE_ECG, MEASURE_HR } = require("../utils/consts");

async function getHistory(req, res) {
  const row = req.query.row;
  const user_id = res.locals.jwt.user_id;

  const data = await prisma.healthData.findMany({
    select: {
      measure_date: true,
      measure_type: {
        select: {
          name: true
        },
      },
      value: true,
    },
    where: {
      user_id: user_id
    },
    take: parseInt(row)
  });

  res.json({
    success: true,
    row: data.length,
    data: data
  });
}

async function saveHistory(req, res) {
  const { type, value } = req.body;
  const user_id = res.locals.jwt.user_id;
  const health = await prisma.healthData.create({
    data: {
      user_id: user_id,
      measure_date: (new Date()).toISOString(),
      value: value,
      measure_type_id: (type.toLowerCase() == 'ecg') ? MEASURE_ECG : MEASURE_HR
    }
  });

  if (!health) {
    res.status(503);
    res.json({
      success: false,
      message: "Error occured in server, please try again later."
    });
    return;
  }

  res.json({
    success: true,
    message: "Health data has been saved."
  });
}

module.exports.getHistory = getHistory;
module.exports.saveHistory = saveHistory;