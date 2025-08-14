const foodService = require('../services/foodService');

function getAllFood(req, res) {
  const items = foodService.getAllFood();
  res.json({ dishes: items });
}

module.exports = {
  getAllFood
};