// Handler for map message container

// ====== IMPORTS ======

import panMapToSite from './panMapToSite';

// ====== FUNCTIONS ======

/**
 * 
 * @param {Object} currentSite
 * @param {Array} points 
 * @param {Object} mapRef 
 */
export default function handleMsgContainerPress (currentSite, points, mapRef) {
    panMapToSite(currentSite, points, mapRef);
}