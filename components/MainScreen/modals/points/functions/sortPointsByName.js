// Sorts points array by control point name

/**
 * @param {Array} points - Array of points objects
 * @returns 
 */
export default function sortPointsByName (points) {
    // Fail conditions
    if (!Array.isArray(points) || !points.length) {
        return [];
    }

    // Sort points
    let sortedPoints = points.sort((pointA, pointB) => {

        if ("cp_name" in pointA && "cp_name" in pointB) { // If both points have a name, then compare and sort them
            return pointA.cp_name.localeCompare(pointB.cp_name);
        } else if (!("cp_name" in pointA) && !("cp_name" in pointB)) { // If neither have a name then leave them as is
            return 0;
        } else if (("cp_name" in pointA) && !("cp_name" in pointB)) { // If pointA has name and pointB doesn't, then sort it first
            return -1;
        } else if (!("cp_name" in pointA) && ("cp_name" in pointB)) { // If pointB has name and pointA doesn't, then sort it first
            return 1;
        } 
    });

    return sortedPoints;
}