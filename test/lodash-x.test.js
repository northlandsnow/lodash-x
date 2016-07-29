/**
 * lodash 扩展方法测试
 */

var _ = require('../index.js');

describe('utils lodash extend test', function() {
    context('isInvalidValue test', function() {
        it('valid number value', function() {
            _.isInvalidValue(0).should.eql(false);
        });
        it('valid string value', function() {
            _.isInvalidValue('1').should.eql(false);
        });
        it('valid object value', function() {
            _.isInvalidValue({ a: 1 }).should.eql(false);
        });
        it('valid array value', function() {
            _.isInvalidValue([1]).should.eql(false);
        });
        it('valid regexp value', function() {
            _.isInvalidValue(/a/).should.eql(false);
        });
        it('valid function value', function() {
            _.isInvalidValue(function() {}).should.eql(false);
        });
        it('valid date value', function() {
            _.isInvalidValue(new Date()).should.eql(false);
        });

        it('invalid string value', function() {
            _.isInvalidValue('').should.eql(true);
        });
        it('invalid object value', function() {
            _.isInvalidValue({}).should.eql(true);
        });
        it('invalid array value', function() {
            _.isInvalidValue([]).should.eql(true);
        });
        it('invalid null value', function() {
            _.isInvalidValue(null).should.eql(true);
        });
        it('invalid undefined value', function() {
            _.isInvalidValue().should.eql(true);
        });
        it('invalid nan value', function() {
            _.isInvalidValue(NaN).should.eql(true);
        });
    });

    context('getType test', function() {
        it('valid number value', function() {
            _.getType(0).should.eql('number');
        });
        it('valid string value', function() {
            _.getType('1').should.eql('string');
        });
        it('valid object value', function() {
            _.getType({ a: 1 }).should.eql('object');
        });
        it('valid array value', function() {
            _.getType([1]).should.eql('array');
        });
        it('valid regexp value', function() {
            _.getType(/a/).should.eql('regexp');
        });
        it('valid function value', function() {
            _.getType(function() {}).should.eql('function');
        });
        it('invalid nan value', function() {
            _.getType(NaN).should.eql('number');
        });
        it('invalid date value', function() {
            _.getType(new Date()).should.eql('date');
        });
        it('invalid date value', function() {
            _.getType(true).should.eql('boolean');
        });
    });

    context('compressObject test', function() {
        it('invalid string value', function() {
            _.compressObject('').should.eql('');
        });
        it('invalid object value', function() {
            _.compressObject(100).should.eql(100);
        });
        it('invalid array value', function() {
            _.compressObject([]).should.eql([]);
        });

        it('valid object value', function() {
            _.compressObject({}).should.eql({});
        });
        
        it('valid object value with no nested object', function() {
            var result = {
                a: 'nihao',
                d: new Date(2014, 5, 1, 23, 59, 59, 999),
                f: ['f']
            };
            _.compressObject({
                a: '   nihao ',
                b: null,
                c: undefined,
                d: new Date(2014, 5, 1, 23, 59, 59, 999),
                e: '',
                f: [null, undefined, {}, NaN, '', [], 'f']
            }).should.eql(result);
        });

        it('valid object value with nested object', function() {
            var result = {
                a: 'nihao',
                d: new Date(2014, 5, 1, 23, 59, 59, 999),
                f: ['f'],
                j: {
                    h: ['h'],
                    g: {
                        k: {
                            l: {
                                m: 10
                            }
                        }
                    }
                }
            };
            _.compressObject({
                a: '   nihao ',
                b: null,
                c: undefined,
                d: new Date(2014, 5, 1, 23, 59, 59, 999),
                e: '',
                f: [null, undefined, {}, NaN, '', [], 'f'],
                j: {
                    h: [null, undefined, {}, NaN, '', [], 'h'],
                    i: '',
                    g: {
                        k: {
                            l: {
                                m: 10,
                                n: null
                            }
                        }
                    }
                }
            }).should.eql(result);
        });
    });
});