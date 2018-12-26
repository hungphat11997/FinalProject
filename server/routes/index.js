
var express = require('express');
var router = express.Router();
let { RpcClient } = require('tendermint');
const base32 = require('base32.js');
const v1 = require('../v1');
const fetch = require('node-fetch');
const { Keypair } = require('stellar-base');
var fs = require('fs');
let axios = require('axios');
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
      if (decodedTx.operation === "update_account") {
        if(decodedTx.params.key === "name") {
          try {
            newfeed.push(`update name to ${decodedTx.params.value.toString('utf8')}`);
          }
          catch(err){
          } 
        }
        if(decodedTx.params.key === "picture") {
          try {
            Buffer.from(decodedTx.params.value, 'binary').toString('base64');
            newfeed.push(`update profile picture`);
          }
          catch(err){
          } 
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

router.post(`/mynewfeedheight`, function(req, res, next) {

  var data = req.body;
  var newfeedheight = [];
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
          v1.PlainTextContent.decode(decodedTx.params.content);
          newfeedheight.push(tx.height);
        }
        catch(err){
        } 
      }
      if (decodedTx.operation === "update_account") {
        if(decodedTx.params.key === "name") {
          try {
            decodedTx.params.value.toString('utf8');
            newfeedheight.push(tx.height);
          }
          catch(err){
          } 
        }
        if(decodedTx.params.key === "picture") {
          try {
            Buffer.from(decodedTx.params.value, 'binary').toString('base64');
            newfeedheight.push(tx.height);
          }
          catch(err){
          } 
        }
      }
      if (decodedTx.operation === "create_account") {
        if(decodedTx.account === data.pbk)
        newfeedheight.push(tx.height);
      }
    })
  })
  .then(() => {
    res.send({newfeedheight: newfeedheight});
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
    var max = res.result.total_count;
    var count = 0;
     for(let i = max -1 ; i >= 0; i--) {
      var buf = new Buffer.from(res.result.txs[i].tx, "base64");
      var decodedTx = v1.decode(buf);
      if (decodedTx.operation === "payment") {
        if(decodedTx.account === data.pbk) {
          paymenthistory.push(`Send ${decodedTx.params.amount} CEL to `);
        }
        else {
          paymenthistory.push(`Receive ${decodedTx.params.amount} CEL from `);
        }
        count++;
      }
      if(count === 10) break;
     }
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
    var max = res.result.total_count;
    var count = 0;
     for(let i = max -1 ; i >= 0; i--) {
      var buf = new Buffer.from(res.result.txs[i].tx, "base64");
      var decodedTx = v1.decode(buf);
      if (decodedTx.operation === "payment") {
        if(decodedTx.account === data.pbk) {
          paymentuser.push(`${decodedTx.params.address}`);
        }
        else {
          paymentuser.push(`${decodedTx.account}`);
        }
        count++;
      }
      if(count === 10) break;
     }
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
      var pbk = "";
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
          fs.readFile('hh.jpg', function(err, original_data){
            //console.log(original_data);
            tx.params.value = Buffer.from(original_data);
            //console.log(tx.params.value);
            v1.sign(tx, "");
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
        router.post(`/hash`, function(req, res, next) {
          var data = req.body;
          var hash = "";
          var seq = 0;
          
          fetch(
            `https://komodo.forest.network/tx_search?query=%22account=%27${data.pbk}%27%22&&per_page=100`
          )
          .then((res) => res.json())
          .then((res) => {
            res.result.txs.map(tx => {
              try{
              var buf = new Buffer.from(tx.tx, "base64");
              var decodedTx = v1.decode(buf);
              if (tx.height === data.height) {
                hash = tx.hash;
              }

            }
            catch(err) {
        
            }
            })
          })
          .then(() => {
            res.send({hash: hash});
          })
        });

        router.post('/comment', function(req, res, next) {

          var data = req.body;
          //var height = 23399;
          var seq = 0;
        const tx = {
          version: 1,
          account: data.pbk,
          sequence: 0,
          memo: Buffer.alloc(0),
          operation: 'interact',
          params: { 
            object: Buffer.alloc(0),
            content: Buffer.alloc(0),
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
            
            tx.sequence = seq + 1;
            
            tx.params.object = data.hash;
            var plain = {
              type: 1,
              text: data.comment
            }
            tx.params.content = v1.PlainTextContent.encode(plain);
            res.send(tx);
//             v1.sign(tx, "SBTT5VPXUEHKIRUA7UX2RCURRXLTGXZP2PRHHFEPZDBF2QNKZAIVNDD5");
//         var txHash =  v1.encode(tx).toString('base64')
//         axios.post('https://komodo.forest.network/', {
//     "jsonrpc": "2.0",
//     "id": 1,
//     "method": "broadcast_tx_commit",
//     "params": [`${txHash}`]
// })
//     .then(res => console.log(res.data))
          })
          
          });


          router.get('/react', function(req, res, next) {

            //var data = req.body;
            var height = 23399;
            var seq = 0;
          const tx = {
            version: 1,
            account: "GCDSJYGKWF5FGLHXWB6VEYIM2UMHVYQJRFDKOEJBADCFN3W5KFSQFJ6S",
            sequence: 0,
            memo: Buffer.alloc(0),
            operation: 'interact',
            params: { 
              object: Buffer.alloc(0),
              content: Buffer.alloc(0),
            },
          }
          fetch(
              `https://komodo.forest.network/tx_search?query=%22account=%27${tx.account}%27%22&&per_page=100`
            )
            .then((res) => res.json())
            .then((res) => {
              res.result.txs.map(tx => {
                var buf = new Buffer.from(tx.tx, "base64");
                var decodedTx = v1.decode(buf);
                if (decodedTx.account === "GCDSJYGKWF5FGLHXWB6VEYIM2UMHVYQJRFDKOEJBADCFN3W5KFSQFJ6S") seq++;
              })
            })
            .then(() => {
              
              tx.sequence = seq + 1;
              
              tx.params.object = "44770718EF24C502C33EE3378ADA5B53496AAEB6049FC316D5223BA9FFC08209";
              var react = {
                type: 2,
                reaction: 4
              }
              tx.params.content = v1.ReactContent.encode(react);
              
              v1.sign(tx, "SBTT5VPXUEHKIRUA7UX2RCURRXLTGXZP2PRHHFEPZDBF2QNKZAIVNDD5");
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
            });

  router.post(`/interact`, function(req, res, next) {

    //var data = req.body;
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
  module.exports = router;
