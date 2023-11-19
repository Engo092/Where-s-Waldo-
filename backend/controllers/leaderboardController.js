const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Time = require('../models/time');

exports.leaderboard_post = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const value = valueTime(req.body.hours, req.body.minutes, req.body.seconds)

        const time = new Time({
            username: req.body.username,
            time: req.body.time,
            value: value,
        });

        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() });
        } else {
            await time.save();
            res.json({ message: "received" });
        }
    })
];

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
    const times = await Time.find().sort({value: 1}).exec();

    res.json({ times: times });
});

const valueTime = (hours, minutes, seconds) => {
    // Value is calculated by counting the total amount of seconds.
    // I could have done this through a method in the front-end,
    // but it would have made times on the leaderboard even more insecure than they already are.
    const hourSeconds = hours * 3600;
    const minuteSeconds = minutes * 60;
    
    const totalSeconds = hourSeconds + minuteSeconds + seconds;
    return totalSeconds;
}