
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
   //var buf = Buffer.from("ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAACIQQ1RUNTIyLUNRMjAxNS8zMgEAIzBBmpPnRNSzjWGT/TmeW8Q5XXmuG3GSkQRDP6cFP3mYKClR80GCjfXS5xwv5JJ/tD9+eP7FbFjiokNRJAvubGCdmXK4Zz/ThsxaD2yYxGrWXHgOJB7vBN1ahaSWlmUt1EsvBw==", 'base64');
   //console.log(v1.decode(buf))
  const data = fetch(`https://komodo.forest.network/tx_search?query=%22account=%27${v1.publicKey}%27%22`)
  .then(res => res.json())
  .then(res => res.result.txs.map((tx) => tx.tx))
  .then(res => res.map(tx => v1.decode(Buffer.from(tx,'base64'))))
  //.then(res => console.log(v1.getSequence(res) + " " + v1.getBalance(res)))
  data.then(res => console.log(v1.getSequence(res) + " " + v1.getBalance(res)))
  //.then(json => console.log(json.result.txs.map((tx) => v1.Transaction.decode(new Buffer(tx.tx),'base64'))));
  //var value = data.result.txs.map((tx) => v1.Transaction.decode(new Buffer(tx.tx),'base64'));

  //console.log("data: " + v1.Transaction.decode(Buffer.from("ATAdxPY3gelauaEcMyjMIuaJsiFe9bIO5kZTCil6jcMzJAwoAAAAAAAAACIQQ1RUNTIyLUNRMjAxNS8zMgEAIzBBmpPnRNSzjWGT/TmeW8Q5XXmuG3GSkQRDP6cFP3mYKClR80GCjfXS5xwv5JJ/tD9+eP7FbFjiokNRJAvubGCdmXK4Zz/ThsxaD2yYxGrWXHgOJB7vBN1ahaSWlmUt1EsvBw==",'base64')))
});
router.get('/acc', function(req, res, next) {
//   const { Keypair } = require('stellar-base');

// const key = Keypair.random();
// console.log(key.secret());
// console.log(key.publicKey());
  var tx2 = {
    version: 1,
    account: "GBAZVE7HITKLHDLBSP6TTHS3YQ4V26NODNYZFEIEIM72OBJ7PGMCQKKR",
    sequence: 2,
    memo: Buffer.alloc(0),
    operation: 'payment',
    params: { address: "GDBHGK7OI2Z6OF7DBX4NCO3UZ2VR65CYE6EIONCIFTTOYHAI7UDVMU5D",
              amount: 100},
  }
  v1.sign(tx2, v1.secretKey);
  //console.log(v1.hash(tx2));
  console.log('0x' + v1.encode(tx2).toString('hex'));
});

  module.exports = router;
