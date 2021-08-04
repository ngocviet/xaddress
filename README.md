# xaddress: The Lotus address format for Node.js and web browsers.

[![NPM](https://nodei.co/npm/cashaddrjs.png?downloads=true)](https://nodei.co/npm/cashaddrjs/)

JavaScript implementation for the new CashAddr address format for Bitcoin Cash.

Compliant with the xaddress [specification](https://givelotus.org/docs/specs/lotus/addresses)

## Installation

### Using NPM

```bsh
$ npm install --save @abcpros/xaddress
```

## Usage

### In Node.js

```javascript
const xaddress = require('xaddress');
const address = 'lotus_16PSJLk9W86KAZp26x3uM176w6N9vUU8YNQQnQTHN';
const { prefix, type, payload, network } = XAddress.decode(address);
console.log(prefix); // 'lotus'
console.log(network); // MAIN
console.log(type); // ScriptPubKey
console.log(payload); // Buffer [ 118, 160, ..., 115 ]
```