// Handles centering/zooming map to control point location


// ====== FUNCTIONS ======

/**
 * @param {Object} point - Object containing point data
 * @param {Object} mapRef - Reference to Mapview component
 */
export default async function panMapToPoint (point, mapRef) {
        // Move map to new view and zoom level
        mapRef.current.animateToRegion({
            latitude: +point.lat,
            longitude: +point.long,
            latitudeDelta: .005,
            longitudeDelta: .005
        });
}