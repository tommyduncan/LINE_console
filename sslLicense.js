const fs = require('fs');

const options = {
  pfx: fs.readFileSync('certificate.pfx'),
  // This is necessary only if using the client certificate authentication.
  requestCert: true,
  passphrase: 'tommy801021'
};

var ssl = {};

ssl.options = options;

module.exports = ssl;