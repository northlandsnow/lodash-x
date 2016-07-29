##lodash-x

lodash-x is based on lodash and extends some new functions. 
Download and use:

```
npm install lodash-x

var _ =  require('lodash-x');

//use all lodash functions and extended functions
``` 

### What's new ?


* isInvalidValue
* compressObject
* getType

### How to use ?

* isInvalidValue:

```
_.isInvalidValue([]);//true
_.isInvalidValue({});//true
_.isInvalidValue(undefined);//true
_.isInvalidValue(null);//true
_.isInvalidValue('');//true
_.isInvalidValue(NaN);//true

```
* getType:

```
_.getType([]);//'array'
_.getType({});//'object'
_.getType(undefined);//'undefined'
_.getType(null);//'null'
_.getType('');//'string'
_.getType(3);//'number'
_.getType(function(){});//'function'
_.getType(/xx/);//'regexp'
_.getType(true);//'boolean'
_.getType(new Date());//'date'

```

* compressObject:

```
var o = _.compressObject({
    a: '   hello ',
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
});
console.log(o);

/* the output like belove
{
    a: 'hello',
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
}
/*

```

### License

MIT