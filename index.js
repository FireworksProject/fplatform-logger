var BUN = require('bunyan')

exports.createLogger = function (aName, aOpts) {
    aOpts = aOpts || {};
    var stream = aOpts.stream || process.stdout;
    return BUN.createLogger({name: aName, stream: stream});
};
