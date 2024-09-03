// Runs before EAS build

// ====== IMPORTS ======

const fs = require('fs');
const path = require('path');
const logHeader = require('../shared/logHeader');

const easConfig = require('./eas.json');
const easFileLoc = path.resolve(__dirname, '../../eas.json');

const appJsonFileLoc = path.resolve(__dirname, '../../app.json');
const appJson = require(appJsonFileLoc); 

//  ====== FUNCTIONS ======


// == EAS

// Inject env into eas.json, cleanup after

function buildEasConfig (env) {
    logHeader('*** BUILDING EAS.JSON ***');

    logHeader('Removing existing eas.json...');
    deleteEas();
    logHeader('Done.');

    logHeader('Building eas.json...');
    buildEas();
    logHeader('Done.');


}

function buildEas () {
    fs.writeFileSync(easFileLoc, JSON.stringify(easConfig, null, 4), 'utf8');
}

function prepareEnv () {
    const env = parseEnv();

    for (const key in easConfig.build) {
        if ("env" in easConfig.build[key]) {
            easConfig.build[key].env = env;
        }
    }

    return env;
}

function deleteEas () {
    if (fs.existsSync(easFileLoc)) {
        fs.unlinkSync(easFileLoc);
    }
}

function parseEnv () {
    // Normalize carraige returns
    const envContent = fs.readFileSync(path.resolve(__dirname, '../../.env'), 'utf8').replaceAll('\r\n', '\n');

    // Split to lines
    const envLines = envContent.split('\n');

    // Split out keys
    const envVars = {};
    
    envLines.forEach((line) => {
        // Find key
        const key = line.split('=')[0];
        
        // Find value
        const lineArray = line.split('=');
        lineArray.shift();
        const value = lineArray.join();

        if (key && value) {
            envVars[key] = value;
        }
    });

    return envVars
}

// == APP.JSON

function buildAppJson (env) {

    logHeader('*** BUILDING APP.JSON ***');

    // Google Maps Api Key
    injectGMapsApiKey(env, appJson);

    // Write changes
    fs.writeFileSync(appJsonFileLoc, JSON.stringify(appJson, null, 4), 'utf8');
}

function injectGMapsApiKey (env, appJson) {
    logHeader('Injecting Google Maps Api Key...');
    appJson.expo.android.config.googleMaps.apiKey = env.GOOGLE_MAPS_KEY;
    appJson.expo.ios.config.googleMapsApiKey = env.GOOGLE_MAPS_KEY;
    logHeader('Done.');
}

// ====== RUN ======

logHeader('\n====\nSTARTING PRE BUILD SCRIPT');
const env = prepareEnv();
buildEasConfig(env);
buildAppJson(env);
logHeader('FINISHED PRE BUILD\n====\n');
