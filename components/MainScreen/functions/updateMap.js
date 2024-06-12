// Updates the map with current information and view

// Functions
import getPoints from "../../../shared/functions/getPoints";
import getSiteDiameter from "./getSiteDiameter";

export default async function updateMap (mapRef, currentSite, userToken, setPoints) {

    // Get points from server
    let points;
    try {
        points = await getPoints(currentSite.op_uid, userToken);
    } catch (err){
        console.log(err);
    }

    // Set points to state
    setPoints(points);

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