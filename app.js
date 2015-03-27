var getConfiguration = require('./lib/get-configuration'),
    setupProxies = require('./lib/setup-proxies'),
    watchr = require('watchr');

var configFile = process.argv[2];

function run() {
    var conf = getConfiguration(configFile);
    setupProxies(conf.origin, 3000, conf.responses);
}

function watch() {
    watchr.watch({
        path: configFile,
        interval: 500,
        listener: function() {
            console.log('Change to ' + configFile + ' detected. Reloading configuration...');
            run();

            // need to close this watchr and set up a new watch because of the way watchr works
            // https://github.com/bevry/watchr/issues/75
            this.close();
            watch();
        }
    });
}

run();
watch();


