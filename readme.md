# fp-omit

removing properties from a collection, in an Immutable and functional way

[![Build Status](https://travis-ci.com/ahhmarr/fp-omit.svg?branch=master)](https://travis-ci.com/ahhmarr/fp-omit)
[![npm module](https://badge.fury.io/js/fp-omit.svg)](https://www.npmjs.org/package/fp-omit)

## Installation

`npm install fp-omit`

## Usage

```
const omit = require('fp-omit');
```

example 1:

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
// returns
//  {
//    index: 0,
//    active_flag: 1,
//    last_login: '2014-06-17T09:41:17 -03:00',
//  }
```

example 2:

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
// returns
//[
//    {
//    index: 0,
//    active_flag: 1,
//    last_login: '2014-06-17T09:41:17 -03:00',
//    user: {
//      name: 'Lorene Delgado',
//    }
//  },
//  {
//    user_id: '5e7c5c0a46d10617d129e9bd',
//    index: 1,
//    active_flag: 1,
//    last_login: '2016-12-17T02:09:29 -02:00',
//    user: {
//      name: 'Callie Wilson',
//    }
//  },
//]
```

example 3 :

```
omit({
    address : {
        county : {
            name :'osage',
            code : 'os'
        },
        street :'bakar stree'
    }
},['address.county.code'])

// returns
// address : {
//        county : {
//            name :'osage',
//        },
//        street :'bakar stree'
//    }
```
