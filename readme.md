# fp-omit

Removing properties from a collection, in an Immutable and functional way.

[![Build Status](https://travis-ci.com/ahhmarr/fp-omit.svg?branch=master)](https://travis-ci.com/ahhmarr/fp-omit)
[![npm module](https://badge.fury.io/js/fp-omit.svg)](https://www.npmjs.org/package/fp-omit)
[![GitHub license](https://img.shields.io/github/license/ahhmarr/fp-omit.svg)](https://github.com/ahhmarr/fp-omit/blob/master/LICENSE)

# Installation

```
npm install fp-omit
```

# Usage

```
const omit = require('fp-omit');
```

### with plain objects:

```
omit({
    user_id: '5e7c5c0a527efb05ad2ae967',
    index: 0,
    guid: 'c3f1b677-5f24-4bdb-81d6-3745947664d2',
    active_flag: 1,
    last_login: '2014-06-17T09:41:17 -03:00',
    user: {
      name: 'Lorene Delgado',
      email: 'lorenedelgado@parcoe.com'
    }
},['user_id','guid','user])

```

```
//returns
{
  index: 0,
  active_flag: 1,
  last_login: '2014-06-17T09:41:17 -03:00',
}
```

### array of objects

```
omit([
    {
    user_id: '5e7c5c0a527efb05ad2ae967',
    index: 0,
    guid: 'c3f1b677-5f24-4bdb-81d6-3745947664d2',
    active_flag: 1,
    last_login: '2014-06-17T09:41:17 -03:00',
    user: {
      name: 'Lorene Delgado',
      email: 'lorenedelgado@parcoe.com'
    }
  },
  {
    user_id: '5e7c5c0a46d10617d129e9bd',
    index: 1,
    guid: '9d424d35-8b96-4a4d-bc91-084420d4b8bd',
    active_flag: 1,
    last_login: '2016-12-17T02:09:29 -02:00',
    user: {
      name: 'Callie Wilson',
      email: 'calliewilson@parcoe.com'
    }
  },
],['user_id','user.email','guid'])

```

```
//returns
[
  {
  index: 0,
  active_flag: 1,
  last_login: '2014-06-17T09:41:17 -03:00',
    user: {
      name: 'Lorene Delgado',
    }
  },
  {
    user_id: '5e7c5c0a46d10617d129e9bd',
    index: 1,
    active_flag: 1,
    last_login: '2016-12-17T02:09:29 -02:00',
    user: {
      name: 'Callie Wilson',
    }
  }
]
```

### n level :

```
omit({
    address : {
        county : {
            name :'osage',
            code : 'os'
        },
        street :'baker street'
    }
},['address.county.code'])


```

```
returns
 address : {
      county : {
          name :'osage',
      },
      street :'baker street'
  }
```

### property with `.`in the name(escape it with \\)

```
omit({
  "some.object.with" : {
    "dot.named.prop" : {
      "delete.this" : 12
    }
  }
},['some.\\object.\\with.dot.\\names.\\prop.delete.\\this'])
```

```
 //return
 {
  "some.object.with" : {
    "dot.named.prop" : {}
  }
}
```

---

# License

MIT
