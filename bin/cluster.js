let cluster = require('cluster');
let os = require('os');
let workers;
if (cluster.isMaster){
    const cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++){
        cluster.fork();
    }
    workers = Object.values(cluster.workers);
    cluster.on('exit', function (worker, code, signal) {
        if (!worker.exitedAfterDisconnect)
            cluster.fork();
    });
    //Start Linux
    /* process.on('SIGUSR2',() => {
        for (let j=0; j < workers.length; j++){
             workers[j].disconnect();
             if(workers[j].exitedAfterDisconnect)
                 cluster.fork();
        }
     });*/
    //end Linux
}
else{
    let www = require('./www');
    www.StartServer();
}