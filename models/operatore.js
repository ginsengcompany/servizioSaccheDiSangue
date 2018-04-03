let mongoose =require('mongoose');
let db = require('../config/db');
let operatoreSchema = new mongoose.Schema({
    uid: String,
    nome: String,
    cognome: String,
    tipoOperatore: String,
    codice_operatore: Number
});
db.Struttura.model('operatore', operatoreSchema);
module.exports = db.Struttura.model('operatore');