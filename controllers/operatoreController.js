let operatore = require('../models/operatore');

exports.getOperatore = function (req, res) {
    if (operatore.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if (!req.headers.uid)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    operatore.findOne({uid: req.headers.uid}, function (err, operatoreTrovato) {
        if (err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if (!operatoreTrovato) return res.status(404).send("L' operatore non è stato trovato");
        res.status(200).send(operatoreTrovato);
    });
};