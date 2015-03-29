var proxy = require('intercept-proxy'),
    getConfiguration = require('./lib/get-configuration'),
    setupHandlers = require('./lib/setup-handlers'),
    _ = require('lodash');

var conf = getConfiguration(process.argv[2]),
    proxyServer = proxy.createServer(conf.origin);

proxyServer.listen(3000, function() {
    console.log('Proxying ' + conf.origin + ' at localhost:' + proxyServer.port + '...');

    setupHandlers(proxyServer, conf.xhr);

    setInterval(_.partial(setupHandlers, proxyServer, conf.xhr), 3000);
});
