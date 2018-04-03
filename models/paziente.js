let mongoose =require('mongoose');
let db = require('../config/db');
let pazienteSchema = new mongoose.Schema({
    uid: String,
    nome: String,
    cognome: String,
    gruppo: String,
    rh: String,
    uidSacca: String,
    dataAssegnazioneTrasfusione: String
});
db.Struttura.model('paziente', pazienteSchema);
module.exports = db.Struttura.model('paziente');