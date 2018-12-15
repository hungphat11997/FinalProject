
var express = require('express');
var router = express.Router();
let { RpcClient } = require('tendermint');
const base32 = require('base32.js');
const v1 = require('../v1');
const fetch = require('node-fetch');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.get('/data', function(req, res, next) {
  // let client = RpcClient('https://komodo.forest.network:443/tx_search?query=%22account=%27GBAZVE7HITKLHDLBSP6TTHS3YQ4V26NODNYZFEIEIM72OBJ7PGMCQKKR%27%22')
  // // request a block
  // client.block({ height: 100 })
  //   .then((res) => console.log(res))
  // var buf = new Buffer("ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAACIQQ1RUNTIyLUNRMjAxNS8zMgEAIzBBmpPnRNSzjWGT/TmeW8Q5XXmuG3GSkQRDP6cFP3mYKClR80GCjfXS5xwv5JJ/tD9+eP7FbFjiokNRJAvubGCdmXK4Zz/ThsxaD2yYxGrWXHgOJB7vBN1ahaSWlmUt1EsvBw==", 'base64');
  // //const bff = base32.decode(buf);
  // console.log(v1.decode(buf))
  fetch('https://komodo.forest.network/tx_search?query=%22account=%27GBAZVE7HITKLHDLBSP6TTHS3YQ4V26NODNYZFEIEIM72OBJ7PGMCQKKR%27%22')
  .then(res => res.json())
  .then(json => console.log(json));
});
module.exports = router;
