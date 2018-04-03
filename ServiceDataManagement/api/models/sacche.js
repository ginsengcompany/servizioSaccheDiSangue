let mongoose = require('mongoose');
let db = require('../config/db');
let saccheSchema = new mongoose.Schema({
    gruppo: String,
    rh: String,
    uid: String,
    dataInserimento: String,
    dataUltimoAggiornamento: String,
    dataAssegnazione: String,
    disponibile: {
        type: Boolean,
        default: false
    },
    stato: String,
    codice_stato: {
        type: Number,
        default: 1
    }
});
db.ServiceDataManagement.model('sacche', saccheSchema);
module.exports = db.ServiceDataManagement.model('sacche');