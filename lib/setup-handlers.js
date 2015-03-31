var _ = require('lodash');

function setupHandlers(proxyServer, xhrs) {
    function getRandomStatusCode(statusCodes) {
        return _.sample(statusCodes || [200, 403, 404, 500, 503]);
    }

    function getRandomLatency() {
        return _.sample([0, 500, 1000, 2000, 3000, 4000]);
    }

    console.log('\nGenerating new response handlers at ' + new Date());

    _.map(xhrs, function setupProxy(xhr) {
            var statusCode = getRandomStatusCode(xhr.statusCodes),
                latency = getRandomLatency(),
                path = xhr.path;

            console.log('Setting proxy with Path: ', path, 'Status Code: ', statusCode, 'Latency: ', latency);

            // only rewrite response if statusCode is non-200
            if (statusCode !== 200) {
                proxyServer.removeHandler(path);
                proxyServer.addHandler(path, function(req, res) {
                    setTimeout(function() {
                        res.writeHead(statusCode);
                        res.end();
                    }, latency);
                });
            }
        });
}

module.exports = setupHandlers;
