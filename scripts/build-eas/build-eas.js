// Runs before EAS build

// ====== IMPORTS ======

const fs = require('fs');
const easConfig = require('./eas.json');

//  ====== FUNCTIONS ======

// Inject env into eas.json, cleanup after

function buildEasConfig () {
    console.dir(easConfig, {depth: null, colors: true});
}

// ====== RUN ======

buildEasConfig();