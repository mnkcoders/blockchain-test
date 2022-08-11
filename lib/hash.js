//const { MD5 } = require("crypto-js");
const SHA256 = require('crypto-js/sha256');

const HASH = function( data ){

    return SHA256(data).toString();

    return MD5(data);


    return (new Date()).toDateString('YYYYMMDD');
};


module.exports = { HASH };