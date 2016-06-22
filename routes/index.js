var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'SLIB'
    });
});

router.post('/cmd', function(req, res, next) {
    res.json({
        "text": "Would you like to build a challenge?",
        "attachments": [{
            "text": "Choose a challenge type",
            "fallback": "You are unable to create challenges",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [{
                "name": "f2f",
                "text": "First To Finish",
                "type": "button",
                "value": "f2f"
            }, {
                "name": "code",
                "text": "Code",
                "type": "button",
                "value": "code"
            }, {
                "name": "prototype",
                "text": "Prototype",
                "style": "danger",
                "type": "button",
                "value": "prototype",
                "confirm": {
                    "title": "Are you sure?",
                    "text": "Wouldn't you prefer an f2f?",
                    "ok_text": "Yes",
                    "dismiss_text": "No"
                }
            }]
        }]
    });
});


router.post('/slacktion', function(req, res, next) {
    res.json({
        text: 'omg stuff. I am still a stupid bot! next step is to prompt you for challenge details!'
    });
});

module.exports = router;
