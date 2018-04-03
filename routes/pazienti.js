let express = require('express');
let router = express.Router();
let pazienteController = require('../controllers/pazienteController');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
// /pazienti/insert
router.post('/insert',pazienteController.insert);
// /pazienti/update
router.post('/update',pazienteController.update);
// /pazienti/take
router.get('/take',pazienteController.getPaziente);
// /pazienti/assegnatrasfusione
router.post('/assegnatrasfusione',pazienteController.assegnaTrasfusione);

module.exports = router;