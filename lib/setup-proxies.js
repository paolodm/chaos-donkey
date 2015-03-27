var proxy = require('intercept-proxy'),
    _ = require('lodash');

var server;

function setupProxies(origin, port, responseConfiguration) {
    server = proxy.createServer(origin);
//    server.removeHandlers();

    server.listen(port, function() {
        console.log('Proxying ' + server.host + ':' + server.port + '...');
    });

    function setupProxy(path, httpStatusCode, latency) {
        server.removeHandler(path);
        server.addHandler(path, function(req, res) {
            setTimeout(function() {
                if (httpStatusCode) {
                    res.writeHead(httpStatusCode);
                }
                res.end();
            }, latency || 0);
        });
    }

    _.each(responseConfiguration, function(config) {
        if (config.url) {
            setupProxy(config.url, config.statusCode, config.latency);
        }
    });

    console.log(server);

}

module.exports = setupProxies;
