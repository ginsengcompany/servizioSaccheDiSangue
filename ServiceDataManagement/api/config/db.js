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
mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});
let conn2 = mongoose.createConnection('mongodb://192.168.125.14:27017/ServiceDataManagement');

exports.ServiceDataManagement = conn2;