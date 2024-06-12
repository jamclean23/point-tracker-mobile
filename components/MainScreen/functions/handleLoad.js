// Loading function for MainScreen

// ====== IMPORTS ======

import retrieveSites from "../../../shared/functions/retrieveSites";

// ====== FUNCTIONS ======

/**
 * 
 * @param {*} setSites - Setter for sites state array
 */
export default function handleLoad (setSites, userToken) {
    retrieveSites(setSites, userToken);
}

