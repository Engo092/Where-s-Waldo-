const express = require('express');
const router = express.Router();

const coordinate_controller = require('../controllers/coordinateController');
const leaderboard_controller = require('../controllers/leaderboardController');


router.post('/coordinate', coordinate_controller.check_coordinate_post);

router.get('/coordinate/:charName', coordinate_controller.check_coordinate_get);

router.post('/leaderboard', leaderboard_controller.leaderboard_post);

router.get('/leaderboard', leaderboard_controller.leaderboard_get);

module.exports = router;
