var url = "https://490f0a5c-5c8d-435c-a709-5a661c8356f6-bluemix:aa85309d3a2d7b79526b89a1ad37b8f2d32a37d0205fcd0e19c091915993707b@490f0a5c-5c8d-435c-a709-5a661c8356f6-bluemix.cloudant.com";

module.exports = require('cloudant')(url).db;
