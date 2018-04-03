let moment = require('moment');
let sacche = require('../models/sacche');

exports.insert = function (req, res) {
    if(sacche.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if(!req.body.uid)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    sacche.findOne({uid: req.body.uid}, function (err, sacca) {
        if(err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if(sacca) return res.status(403).send('La sacca di sangue rilevata è stata già registrata');
        sacche.create({
            uid: req.body.uid,
            stato: "Da analizzare",
            dataInserimento: moment().format('DD/MM/YYYY h:mm:ss')
        }, function (err, sacc) {
            if (err) return res.status(500).send('La registrazione della sacca di sangue non è avvenuta');
            res.status(201).send('La registrazione della sacca di sangue è stata effettuata con successo');
        });
    });
};

exports.update = function (req, res) {
    if(sacche.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if(!req.body.uid || !req.body.gruppo || !req.body.rh)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    sacche.findOne({uid: req.body.uid}, function (err, sacca) {
        if(err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if(!sacca) return res.status(404).send('La sacca di sangue non è stata trovata');
        sacca.gruppo = req.body.gruppo;
        sacca.rh = req.body.rh;
        sacca.stato = "Analizzata";
        sacca.codice_stato = 2;
        sacca.disponibile = true;
        sacca.dataUltimoAggiornamento = moment().format('DD/MM/YYYY h:mm:ss');
        sacca.save(function (err, updateSacca) {
            if(err) return res.status(503).send('Il servizio è al momento indisponibile');
            res.status(200).send('Aggiornamento delle informazioni avvenuto con successo');
        });
    });
};

exports.getSacca = function (req, res) {
    if(sacche.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if(!req.headers.uid)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    sacche.findOne({uid: req.headers.uid}, function (err, sacca) {
        if(err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if(!sacca) return res.status(404).send('La sacca di sangue non è stata trovata');
        res.status(200).send(sacca);
    });
};

exports.assegnaSacca = function (req, res) {
    if(sacche.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if(!req.headers.uid)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    sacche.findOne({uid: req.headers.uid}, function (err, sacca) {
        if(err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if(!sacca) return res.status(404).send('La sacca di sangue non è stata trovata');
        sacca.codice_stato = 3;
        sacca.stato = "Assegnata";
        sacca.disponibile = false;
        sacca.save(function (err, updateSacca) {
            if(err) return res.status(503).send('Il servizio è al momento indisponibile');
            res.status(200).send(updateSacca);
        });
    });
};