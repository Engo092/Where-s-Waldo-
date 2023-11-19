const asyncHandler = require('express-async-handler');

exports.check_coordinate_post = asyncHandler(async (req, res, next) => {
    try {
        switch (req.body.character) {
        case "waldoSelect":
            if (isWaldo(req.body.x, req.body.y)) {
            res.json({ found: true, character: "Waldo"});
            } else {
            res.json({ found: false })
            }
            break;
        case "wilmaSelect":
            if (isWilma(req.body.x, req.body.y)) {
            res.json({ found: true, character: "Wilma"});
            } else {
            res.json({ found: false })
            }
            break;
        case "wizardSelect":
            if (isWizard(req.body.x, req.body.y)) {
            res.json({ found: true, character: "Wizard"});
            } else {
            res.json({ found: false })
            }
            break;
        case "odlawSelect":
            if (isOdlaw(req.body.x, req.body.y)) {
            res.json({ found: true, character: "Odlaw"});
            } else {
            res.json({ found: false })
            }
            break;
        default:
            res.json({ found: false });
        }
    } catch(err) {
        next(err);
    }
});

exports.check_coordinate_get = asyncHandler(async (req, res, next) => {
    switch (req.params.charName) {
        case "Waldo":
            res.json({ x: 1900, y: 175 });
            break;
        case "Wilma":
            res.json({ x: 535, y: 940 });
            break;
        case "Wizard":
            res.json({ x: 575, y: 625 });
            break;
        case "Odlaw":
            res.json({ x: 1820, y: 840 });
            break;
        default:
            res.json({ message: "Unknown character: " + req.params, });
        }
    }
);


function isWaldo(x, y) {
    if (1913 <= x && x <= 1936 && 158 <= y && y <= 218) {
        return true;
    }
    return false;
}

function isWilma(x, y) {
    if (553 <= x && x <= 578 && 937 <= y && y <= 1013) {
        return true;
    }
    return false;
}

function isWizard(x, y) {
    if (570 <= x && x <= 645 && 574 <= y && y <= 712) {
        return true;
    }
    return false;
}

function isOdlaw(x, y) {
    if (1823 <= x && x <= 1857 && 818 <= y && y <= 942) {
        return true;
    }
    return false;
}