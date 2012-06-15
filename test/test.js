describe('logger', function () {
    var LOG = require('../')

    it('should write to a stream', function (done) {
        var buff = '';
        var stream = {
            write: function (chunk) {
                buff += chunk;
            }
        };

        var log = LOG.createLogger('test_a', {stream: stream});
        log.info('start');

        var out = JSON.parse(buff.trim());
        expect(out.name).toBe('test_a');
        expect(out.level).toBe(30);
        expect(out.msg).toBe('start');
        return done();
    });

    it('should log by level', function (done) {
        var buff = '';
        var stream = {
            write: function (chunk) {
                buff += chunk;
            }
        };

        var log = LOG.createLogger('test_b', {stream: stream});
        log.trace('a-trace');
        log.debug('a-debug');
        log.info('a-info');
        log.warn('a-warn');
        log.error('a-error');
        log.fatal('a-fatal');

        var lines = buff.trim().split('\n');
        expect(lines.length).toBe(4);

        var info = JSON.parse(lines[0]);
        expect(info.level).toBe(30);
        expect(info.msg).toBe('a-info');

        var warn = JSON.parse(lines[1]);
        expect(warn.level).toBe(40);
        expect(warn.msg).toBe('a-warn');

        var error = JSON.parse(lines[2]);
        expect(error.level).toBe(50);
        expect(error.msg).toBe('a-error');

        var fatal = JSON.parse(lines[3]);
        expect(fatal.level).toBe(60);
        expect(fatal.msg).toBe('a-fatal');

        return done();
    });
});
