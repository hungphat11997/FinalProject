
var express = require('express');
var router = express.Router();
let { RpcClient } = require('tendermint');
const base32 = require('base32.js');
const v1 = require('../v1');
const fetch = require('node-fetch');
const { Keypair } = require('stellar-base');
var fs = require('fs');
let axios = require('axios');
var b64toBlob = require('b64-to-blob');
//var Buffer = require('buffer/').Buffer;
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});


router.post(`/data`, function(req, res, next) {

  var data = req.body;
  var name = "";
  var seq = 0;
  var balance = 0;
  
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      try{
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
      //console.log(decodedTx)
      if (decodedTx.account === data.pbk) seq++;
      if (decodedTx.operation === "payment") {
        if (decodedTx.params.address === data.pbk) {
          balance += decodedTx.params.amount;
        }
        else {
          balance -= decodedTx.params.amount;
        }
      }
      if(decodedTx.operation === "update_account") {
        if(decodedTx.params.key === "name")
        {
          name = decodedTx.params.value.toString('utf8');
        }
      }
    }
    catch(err) {

    }
    })
  })
  .then(() => {
    res.send({name: name, sequence: seq, balance: balance});
  })
});

router.post(`/picture`, function(req, res, next) {

  var data = req.body;
  var picture = "";
  var seq = 0;
  var balance = 0;
  
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
      if (decodedTx.account === data.pbk) seq++;
      
      if(decodedTx.operation === "update_account") {
        if(decodedTx.params.key === "picture")
        {
          picture = new Buffer(decodedTx.params.value, 'binary').toString('base64');
        }
      }
    })
  })
  .then(() => {
    res.send({picture: picture});
  })
});

router.post(`/check`, function(req, res, next) {

  var data = req.body;
  var isValid = false;
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.total_count > 0 ? isValid = true : isValid = false;
  })
  .then(() => {
    res.send({isValid: isValid});
  })
});

router.post(`/mynewfeed`, function(req, res, next) {

  var data = req.body;
  var newfeed = [];
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
      if (decodedTx.operation === "post") {
        try {
          newfeed.push(v1.PlainTextContent.decode(decodedTx.params.content).text);
        }
        catch(err){
          
        }
        
      }
      if (decodedTx.operation === "create_account") {
        if(decodedTx.account === data.pbk)
        newfeed.push(`Create account ${decodedTx.params.address.substring(0,15)}...`);
      }
    })
  })
  .then(() => {
    res.send({newfeed: newfeed});
  })
});

router.post(`/paymenthistory`, function(req, res, next) {

  var data = req.body;
  var paymenthistory = [];
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
     
      if (decodedTx.operation === "payment") {
        if(decodedTx.account === data.pbk) {
          paymenthistory.push(`Send ${decodedTx.params.amount} CEL to `);
        }
        else {
          paymenthistory.push(`Receive ${decodedTx.params.amount} CEL from `);
        }
      }
    })
  })
  .then(() => {
    res.send({payHis: paymenthistory});
  })
});

router.post(`/paymentuser`, function(req, res, next) {

  var data = req.body;
  var paymentuser = [];
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
     
      if (decodedTx.operation === "payment") {
        if(decodedTx.account === data.pbk) {
          paymentuser.push(`${decodedTx.params.address}`);
        }
        else {
          paymentuser.push(`${decodedTx.account}`);
        }
      }
    })
  })
  .then(() => {
    res.send({payUser: paymentuser});
  })
});

router.post(`/followkey`, function(req, res, next) {

  var data = req.body;
  var followkey = [];
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
     
      if (decodedTx.operation === "update_account") {
        if(decodedTx.params.key === "followings") {
          //
          try{
            followkey = v1.Followings.decode(decodedTx.params.value).addresses;
          }
          catch(err) {

          }
        }
      }
    })
  })
  .then(() => {
    for(let i = 0; i < followkey.length; i++) {
      followkey[i] = base32.encode(followkey[i])
    }
    res.send({followkey: followkey});
  })
});

router.post('/createaccount', function(req, res, next) {

  var data = req.body;
  var seq = 0
  const tx = {
    version: 1,
    account: data.pbk,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'create_account',
    params: { address: data.account},
  }
  fetch(
      `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
    )
    .then((res) => res.json())
    .then((res) => {
      res.result.txs.map(tx => {
        var buf = new Buffer.from(tx.tx, "base64");
        var decodedTx = v1.decode(buf);
        if (decodedTx.account === data.pbk) seq++;
      })
    })
    .then(() => {
      tx.sequence = seq + 1
      res.send(tx)
    })


});

router.post('/payment', function(req, res, next) {

  var data = req.body;
  var seq = 0;
  const tx = {
    version: 1,
    account: data.pbk,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'payment',
    params: { address: data.receiver,
              amount: data.amount},
  }
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
      if (decodedTx.account === data.pbk) seq++;
    })
  })
  .then(() => {
    tx.sequence = seq + 1;
    res.send(tx)
  });
})


router.post("/post", function (req, res, next) {

  var data = req.body;
  var seq = 0;
  const tx = {
    version: 1,
    account: data.pbk,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'post',
    params: { content: Buffer.alloc(0),
      keys: []},
  }
  fetch(
      `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
    )
    .then((res) => res.json())
    .then((res) => {
      res.result.txs.map(tx => {
        var buf = new Buffer.from(tx.tx, "base64");
        var decodedTx = v1.decode(buf);
        if (decodedTx.account === data.pbk) seq++;
      })
    })
    .then(() => {
var plain = {
  type: 1,
  text: data.post,
}
var x = v1.PlainTextContent.encode(plain)

      tx.params.content = x;
      tx.sequence = seq + 1;
      console.log(tx.sequence)
      res.send(tx)
    })

});


  router.post('/updatename', function(req, res, next) {

    var data = req.body;
    var seq = 0
  const tx = {
    version: 1,
    account: data.pbk,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'update_account',
    params: { 
      key: "name",
      value: Buffer.alloc(0)
    },
  }
  fetch(
      `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
    )
    .then((res) => res.json())
    .then((res) => {
      res.result.txs.map(tx => {
        var buf = new Buffer.from(tx.tx, "base64");
        var decodedTx = v1.decode(buf);
        if (decodedTx.account === data.pbk) seq++;
      })
    })
    .then(() => {
      tx.params.value = Buffer.from(data.name, 'utf8');
      tx.sequence = seq + 1;
      res.send(tx)
    })
    });

    router.get('/updatepicture', function(req, res, next) {

      //var data = req.body;
      var pbk = "GBAZVE7HITKLHDLBSP6TTHS3YQ4V26NODNYZFEIEIM72OBJ7PGMCQKKR";
      var seq = 0;
    const tx = {
      version: 1,
      account: pbk,
      sequence: 0,
      memo: Buffer.alloc(0),
      operation: 'update_account',
      params: { 
        key: "picture",
        value: Buffer.alloc(0)
      },
    }
    fetch(
        `https://komodo.forest.network/tx_search?query=%22account=%27${pbk}%27%22&&per_page=100`
      )
      .then((res) => res.json())
      .then((res) => {
        res.result.txs.map(tx => {
          var buf = new Buffer.from(tx.tx, "base64");
          var decodedTx = v1.decode(buf);
          if (decodedTx.account === pbk) seq++;
        })
      })
      .then(() => {

          //tx.params.value = data.picture;
          tx.sequence = seq + 1;
          //console.log(data.file)

          //v1.base64_decode(data.file, 'copy.jpg');
          fs.readFile('Desert.jpg', function(err, original_data){
            
            //console.log(original_data);
            tx.params.value = Buffer.from(original_data);//Buffer.from(original_data);
            //console.log(tx.params.value);
            v1.sign(tx, "SBGZ5OSTDSA6FJEF7GB4MB2GQVL4WOHVKDSPY3ODCFOALPEPIFCOETMF");
        var txHash =  v1.encode(tx).toString('base64')
        axios.post('https://komodo.forest.network/', {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "broadcast_tx_commit",
    "params": [`${txHash}`]
})
    .then(res => console.log(res.data))
          })
          res.send("");
        
        
      })
      //.then(res.send(""))
      });

      router.post('/updatefollowing', function(req, res, next) {

        var data = req.body;
        var seq = 0
      const tx = {
        version: 1,
        account: data.pbk,
        sequence: 0,
        memo: Buffer.alloc(0),
        operation: 'update_account',
        params: { 
          key: "followings",
          value: Buffer.alloc(0),
        },
      }
      fetch(
          `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
        )
        .then((res) => res.json())
        .then((res) => {
          res.result.txs.map(tx => {
            var buf = new Buffer.from(tx.tx, "base64");
            var decodedTx = v1.decode(buf);
            if (decodedTx.account === data.pbk) seq++;
          })
        })
        .then(() => {
          var add = [];
          for(let i = 0; i < data.followings.length; i++){
            add.push(base32.decode(data.followings[i]))
          }
          var followings = {
            addresses: add,
          }
          
          tx.params.value = v1.Followings.encode(followings);
          tx.sequence = seq + 1;
          res.send(tx);
        })
        });

  module.exports = router;
