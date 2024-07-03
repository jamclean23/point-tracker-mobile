// Handles centering/zooming map to currentSite location


// ====== IMPORTS ======

import getSiteDiameter from "./getSiteDiameter";


// ====== FUNCTIONS ======

/**
 * @param {Object} currentSite - Object containing currentSite data
 * @param {Array} points - Array of object containing point data
 * @param {Object} mapRef - Reference to Mapview component
 */
export default async function panMapToSite (currentSite, points, mapRef) {

    // Get delta and apply a maximum value
    let delta = getSiteDiameter(currentSite, points);
    if (delta > 50) {
        delta = 50;
    }
    

    // Move map to new view and zoom level
    mapRef.current.animateToRegion({
        latitude: +currentSite.lat,
        longitude: +currentSite.long,
        latitudeDelta: delta,
        longitudeDelta: delta
    });
}