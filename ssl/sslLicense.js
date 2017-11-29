const fs = require('fs');

const options = {
  // pfx: fs.readFileSync('certificate_combined.pfx'),
  // This is necessary only if using the client certificate authentication.
  cert: fs.readFileSync('ssl/certificate.pem'),
  key: fs.readFileSync('ssl/private.key'), 
  ca: [
    fs.readFileSync('ssl/ca_bundle.pem')
  ]
  // requestCert: true,
  // passphrase: '801021'
};

var ssl = {};

ssl.options = options;

module.exports = ssl;
