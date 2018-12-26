const vstruct = require('varstruct');
const base32 = require('base32.js');
const { Keypair } = require('stellar-base');
const crypto = require('crypto');
const fetch = require('node-fetch');
var fs = require('fs');

const Transaction = vstruct([
  { name: 'version', type: vstruct.UInt8 },
  { name: 'account', type: vstruct.Buffer(35) },
  { name: 'sequence', type: vstruct.UInt64BE },
  { name: 'memo', type: vstruct.VarBuffer(vstruct.UInt8) },
  { name: 'operation', type: vstruct.UInt8 },
  { name: 'params', type: vstruct.VarBuffer(vstruct.UInt16BE) },
  { name: 'signature', type: vstruct.Buffer(64) },
]);

const CreateAccountParams = vstruct([
  { name: 'address', type: vstruct.Buffer(35) },
]);

const PaymentParams = vstruct([
  { name: 'address', type: vstruct.Buffer(35) },
  { name: 'amount', type: vstruct.UInt64BE },
]);

const EncryptionKey = vstruct([
  // 24 bytes as nonce for box, 16 first bytes is IV
  { name: 'nonce', type: vstruct.Buffer(24) },
  // 42 bytes of key + 10 bytes after box
  { name: 'box', type: vstruct.Buffer(42) },
]);

const PostParams = vstruct([
  // Maximum length 65536 in bytes
  { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
  // Private share no more than 256 - 1 (me) people
  // 0 key => public post
  // >= 1 key => share with specific people, may including me. First 16/24 bytes of content are nonce/iv
  { name: 'keys', type: vstruct.VarArray(vstruct.UInt8, vstruct.Buffer(42)) },
]);

const PlainTextContent = vstruct([
  { name: 'type', type: vstruct.UInt8 },
  { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);

const UpdateAccountParams = vstruct([
  { name: 'key', type: vstruct.VarString(vstruct.UInt8) },
  { name: 'value', type: vstruct.VarBuffer(vstruct.UInt16BE) },
]);

const Followings = vstruct([
  { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
]);

const InteractParams = vstruct([
  // Post or comment (or something else?)
  { name: 'object', type: vstruct.Buffer(32) },
  // Encrypt with same post key (if any)
  // Depend on object on parent object keys. First 16 bytes of content are nonce/iv
  { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
  // React if '', like, love, haha, anrgy, sad, wow
]);

const ReactContent = vstruct([
  { name: 'type', type: vstruct.UInt8 },
  { name: 'reaction', type: vstruct.UInt8 },
]);

function encode(tx) {
  let params, operation;
  if (tx.version !== 1) {
    throw Error('Wrong version');
  }
  switch (tx.operation) {
    case 'create_account':
      params = CreateAccountParams.encode({
        ...tx.params,
        address: Buffer.from(base32.decode(tx.params.address)),
      });
      operation = 1;
      break;

    case 'payment':
      params = PaymentParams.encode({
        ...tx.params,
        address: Buffer.from(base32.decode(tx.params.address)),
      });
      operation = 2;
      break;

    case 'post':
      params = PostParams.encode(tx.params);
      operation = 3;
      break;

    case 'update_account':
      params = UpdateAccountParams.encode(tx.params);
      operation = 4;
      break;

    case 'interact':
      params = InteractParams.encode({
        ...tx.params,
        object: Buffer.from(tx.params.object, 'hex'),
      });
      operation = 5;
      break;

    default:
      throw Error('Unspport operation');
  }

  return Transaction.encode({
    version: 1,
    account: Buffer.from(base32.decode(tx.account)),
    sequence: tx.sequence,
    memo: tx.memo,
    operation,
    params,
    signature: tx.signature,
  });
}

function decode(data) {
  const tx = Transaction.decode(data);
  if (tx.version !== 1) {
    throw Error('Wrong version');
  }
  let operation, params;
  switch (tx.operation) {
    case 1:
      operation = 'create_account';
      params = CreateAccountParams.decode(tx.params);
      params.address = base32.encode(params.address);
      Keypair.fromPublicKey(params.address);
      break;

    case 2:
      operation = 'payment';
      params = PaymentParams.decode(tx.params);
      params.address = base32.encode(params.address);
      Keypair.fromPublicKey(params.address);
      break;
    
    case 3:
      operation = 'post';
      params = PostParams.decode(tx.params);
      break;

    case 4:
      operation = 'update_account';
      params = UpdateAccountParams.decode(tx.params);
      break;
    
    case 5:
      operation = 'interact';
      params = InteractParams.decode(tx.params);
      params.object = params.object.toString('hex').toUpperCase();
      break;
    
    default:
      throw Error('Unspport operation');
  }
  return {
    version: 1,
    account: base32.encode(tx.account),
    sequence: tx.sequence,
    memo: tx.memo,
    operation,
    params,
    signature: tx.signature,
  };
}

function getUnsignedHash(tx) {
  return crypto
    .createHash('sha256')
    .update(encode({
      ...tx,
      signature: Buffer.alloc(64, 0),
    }))
    .digest();
}

function sign(tx, secret) {
  const key = Keypair.fromSecret(secret);
  tx.account = key.publicKey();
  tx.signature = key.sign(getUnsignedHash(tx));
}

function verify(tx) {
  const key = Keypair.fromPublicKey(tx.account);
  return key.verify(getUnsignedHash(tx), tx.signature);
}

function hash(tx) {
  return tx.hash = crypto.createHash('sha256')
    .update(encode(tx))
    .digest()
    .toString('hex')
    .toUpperCase();
}

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  //console.log(bitmap)
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}
function base64_decode(base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var bitmap = new Buffer(base64str, 'base64');
  // write buffer to file
  fs.writeFileSync(file, bitmap);
  console.log('******** File created from base64 encoded string ********');
}
module.exports = { encode, decode, Transaction, PlainTextContent, ReactContent, PostParams, Followings, sign, hash, verify, base64_encode, base64_decode };