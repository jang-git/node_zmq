const os = require('os');
// const request = require('request');

const util = {
  getHostName: function() {
  　console.log(os.hostname())
    return os.hostname();
  },
  getIPAdress: function() {　　
    let interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          // console.log(alias.address);
          return alias.address;
        }
    　}
    }
    return '127.0.0.1'
  },
  tcpAddress: function(ports='9001') {
    const ip = this.getIPAdress();
    return `tcp://${ip}:${ports}`;
  },
  // httprequest: function(url,data){
  //   request({
  //       url: url,
  //       method: "POST",
  //       json: true,
  //       headers: {
  //           "content-type": "application/json",
  //       },
  //       body: data
  //   }, function(error, response, body) {
  //       if (!error && response.statusCode == 200) {
  //           console.log(body) // 请求成功的处理逻辑
  //       }
  //   });
  // }
};

module.exports = util;