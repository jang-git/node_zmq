const zmq = require('zeromq');
const responder = zmq.socket('dealer');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const util = require('./util');

const tcpaddress = util.tcpAddress();

async function postData(jsonData) {
  return new Promise(function(resolve, reject) {
    superagent.post('http://127.0.0.1:8360/zmq')
    .set('Accept','application/json')
    .send(jsonData)
    .charset('utf8')
    .end(
      function(err, res) {
        if (err) return reject(err);
        resolve(res.text);
      }
    );
  });
}

responder.bind(tcpaddress, function(err) {
  if (err) {
    console.log(err);
    responder.close();
  } else {
    console.log("Listening on "+tcpaddress);
  }
});

responder.on('message', async function(request) {
  const jsondd = request.toString();
  console.log("接收到传来的数据: ", request.toString());
  const res = await postData(JSON.parse(jsondd));
  responder.send(res);
});

process.on('SIGINT', function() {
  responder.close();
});

// async function test() {
//   const json = {
//     optype: 'getDeviceList',
//     data: []
//   }
//   const a  = await postData(json);

//   console.log(a);
// }

// test();