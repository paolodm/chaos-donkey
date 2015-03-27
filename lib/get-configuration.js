var yaml = require('js-yaml'),
    fs = require('fs');

    function getConfiguration(filename) {
    try {
        return yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
    } catch (e) {
        console.log('Could not load configuration: ', e);
        process.exit(-1);
    }
}

module.exports = getConfiguration;
