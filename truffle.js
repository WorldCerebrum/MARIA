var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "javascripts/app.js": [
      "javascripts/const.js",
      "javascripts/01.js",
      "javascripts/app.js",
      "javascripts/q.js",
      "javascripts/moment.js",
      "javascripts/buffer.js"
    ],
    "external/": "external/",
    "stylesheets/": "stylesheets/",
    "javascripts/fhir.jsx": "javascripts/fhir.jsx",
    "images/": "images/"
  }),
  networks: {
    development: {
      host: "mariatestrpc",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
