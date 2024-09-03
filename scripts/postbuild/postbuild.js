// Runs after EAS build

// ====== IMPORTS ======

const fs = require('fs');
const path = require('path');
const logHeader = require('../shared/logHeader');

const appJsonFileLoc = path.resolve(__dirname, '../../app.json');
const appJson = require(appJsonFileLoc); 


// ====== FUNCTIONS ======

function postbuild () {
    logHeader('\n====\nSTARTING POST BUILD SCRIPT');
    scrubApiKeys();
    writeAppJsonChanges();
    logHeader('FINISHED POST BUILD\n====\n');
}

function scrubApiKeys () {
    logHeader('REMOVING API KEYS FROM app.json...');
    // Google Maps API key
    appJson.expo.android.config.googleMaps.apiKey = "";
    appJson.expo.ios.config.googleMapsApiKey = "";
    logHeader('DONE');
}

function writeAppJsonChanges () {
    fs.writeFileSync(appJsonFileLoc, JSON.stringify(appJson, null, 4), 'utf8');
}


// ====== RUN ======

postbuild();