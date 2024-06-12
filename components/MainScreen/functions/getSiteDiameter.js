// Claculates approximate diameter of site given the distances of its control points. Used for camera estimation and site marker.

/**
 * 
 * @param {*} currentSite 
 * @param {*} points 
 * @returns 
 */
export default function getSiteDiameter (currentSite, points) {
        // Fail conditions
        if (
            !currentSite
            || !points
            || !Array.isArray(points)
        ) {
            console.log('Bad arguments in getSiteDiameter');
            throw new Error('Bad arguments in getSiteDiameter');
        }

        // Calculate distance from site location in order to calculate map view delta
        let distances = [];
        points.forEach((point) => {
            const yDistance = Math.abs(+currentSite.lat - +point.lat);
            const xDistance = Math.abs(+currentSite.long - +point.long);
            distances.push(Math.sqrt(xDistance**2 + yDistance**2));
        });
    
        // Pick the largest distance, double it and add padding
        const delta = distances.sort().reverse()[0]*2;

        return delta;
}