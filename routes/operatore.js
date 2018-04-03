let express = require('express');
let router = express.Router();
let operatoreController = require('../controllers/operatoreController');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
// /operatori/take
router.get('/take',operatoreController.getOperatore);

module.exports = router;