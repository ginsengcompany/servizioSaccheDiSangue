let moment = require('moment');
let paziente = require('../models/paziente');
let request = require('request');

exports.insert = function (req, res) {
    if (paziente.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if (!req.body.uid)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    paziente.findOne({uid: req.body.uid},function (err, pazienteTrovato) {
        if(err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if(pazienteTrovato) return res.status(403).send('Il paziente è già registrato');
        pazienteTrovato.create({
            uid: req.body.uid,
            dataInserimento: moment().format('DD/MM/YYYY h:mm:ss')
        }, function (err, paz) {
            if (err) return res.status(500).send('La registrazione del paziente non è avvenuta');
            res.status(201).send('La registrazione del paziente è stata effettuata con successo');
        });
    });
};

exports.update = function (req, res) {
    if (paziente.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if (!req.body.uid && !req.body.nome && !req.body.cognome && !req.body.gruppo && !req.body.rh)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    paziente.findOne({uid: req.body.uid},function (err, pazienteTrovato) {
        if(err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if(!pazienteTrovato) return res.status(404).send('Il paziente non è stato trovato');
        pazienteTrovato.nome = req.body.nome;
        pazienteTrovato.cognome = req.body.cognome;
        pazienteTrovato.gruppo = req.body.gruppo;
        pazienteTrovato.rh = req.body.rh;
        pazienteTrovato.dataUltimoAggiornamento = moment.format('DD/MM/YYYY h:mm:ss');
        pazienteTrovato.save(function (err, updatePaziente) {
            if (err) return res.status(503).send('Il servizio è al momento indisponibile');
            res.status(200).send('Aggiornamento delle informazioni avvenuto con successo');
        });
    });
};

exports.getPaziente = function (req, res) {
    if (paziente.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if (!req.headers.uid)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    paziente.findOne({uid: req.headers.uid}, function (err, pazienteTrovato) {
        if (err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if (!pazienteTrovato) return res.status(404).send('Il paziente non è stato trovato');
        res.status(200).send(pazienteTrovato);
    });
};

exports.assegnaTrasfusione = function (req, res) {
    if (paziente.db._readyState !== 1)
        return res.status(500).send('Il servizio è al momento indisponibile');
    if(!req.body.uid || !req.body.uidSacca)
        return res.status(400).send('La richiesta non può essere soddisfatta a causa di dati insufficienti');
    paziente.findOne({uid: req.body.uid}, function (err, pazienteTrovato) {
        if(err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
        if (!pazienteTrovato) return res.status(404).send('Il paziente non è stato trovato');
        let options = {
            url: 'http://192.168.125.14:3001/sacche/assegnasacca',
            headers: {
                uid: req.body.uidSacca
            }
        };
        request(options,function (err, response, body) {
            if (err) return res.status(500).send('Si è verificato un errore, riprova più tardi');
            if (body){
                let parseBody = JSON.parse(body);
                pazienteTrovato.uidSacca = parseBody.uid;
                pazienteTrovato.dataAssegnazioneTrasfusione = moment().format('DD/MM/YYYY h:mm:ss');
                pazienteTrovato.save(function (err, updatePaziente) {
                    if (err) return res.status(503).send('Il servizio è al momento indisponibile');
                    res.status(200).send('Assegnazione effettuata con successo');
                });
            }
        });
    });
};