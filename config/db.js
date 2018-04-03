let mongoose = require('mongoose');
/*
let userMongo = "SuperUser";
let passMongo = "Sup3rUs3r";
let options = {
    user: userMongo,
    pass: passMongo,
    useMongoClient: true
};*/
mongoose.connection.on("error", function (err) {
    console.error('Errore di connessione al database',err);
});

let conn1 = mongoose.createConnection('mongodb://192.168.125.14:27017/Struttura');

exports.Struttura = conn1;