// Logout function to be used by handlers

// ====== IMPORTS ======

import deleteToken from "./deleteToken";


// ====== FUNCTIONS ======

export default async function logout (appResetter) {
    try {
        await deleteToken();
        if (appResetter && typeof appResetter === 'function') {
            appResetter();
        }
    } catch (err) {
        console.log(err);
        throw new Error('Logout unsuccessful');
    }
}