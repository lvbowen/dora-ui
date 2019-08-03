const url = require('url');
const address = require('address');

module.exports = function prepareUrls(protocol, host, port) {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '/'
    });

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  let prettyHost, lanUrl;
  if (isUnspecifiedHost) {
    prettyHost = 'localhost';
    try {
      // This can only return an IPv4 address
      lanUrl = address.ip();
      if (lanUrl) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrl)) {
          // Address is private, format it for later use
        } else {
          // Address is not private, so we will discard it
          lanUrl = undefined;
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host;
  }
  const localUrl = formatUrl(prettyHost);
  return {
    lanUrl,
    localUrl
  };
};
