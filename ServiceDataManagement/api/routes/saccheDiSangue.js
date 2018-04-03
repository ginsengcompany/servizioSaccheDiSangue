let express = require('express');
let router = express.Router();
let saccheController = require('../controllers/saccheDiSangueController');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
// sacche/insert
router.post('/insert',saccheController.insert);
// sacche/update
router.post('/update',saccheController.update);
// sacche/take
router.get('/take',saccheController.getSacca);
// /sacche/assegnasacca
router.get('/assegnasacca',saccheController.assegnaSacca);

module.exports = router;