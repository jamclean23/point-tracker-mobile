// Runs before EAS build

// ====== IMPORTS ======

const fs = require('fs');
const path = require('path');

const easConfig = require('./eas.json');
const easFileLoc = path.resolve(__dirname, '../../eas.json');

//  ====== FUNCTIONS ======

// Inject env into eas.json, cleanup after

function buildEasConfig () {
    logHeader('*** BUILDING EAS.JSON ***');
    const env = prepareEnv();

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

function logHeader (text) {
    console.log(`\n\x1b[36m${text}\x1b[0m`);
};

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

// ====== RUN ======

buildEasConfig();