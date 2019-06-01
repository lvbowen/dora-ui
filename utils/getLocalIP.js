function getLocalIP() {
  var os = require('os'),
    iptable = {},
    ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    ifaces[dev].forEach(function(details, alias) {
      if (details.family == 'IPv4') {
        iptable[dev + (alias ? ':' + alias : '')] = details.address;
      }
    });
  }
  return iptable['en0:1'];
}

module.exports = getLocalIP;
