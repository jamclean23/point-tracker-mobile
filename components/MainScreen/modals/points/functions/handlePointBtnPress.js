// Handler for point btn press

// ====== IMPORTS ======

import panMapToPoint from "./panMapToPoint";


// ====== FUNCTIONS ======

export default function handlePointBtnPress (point, mapRef, closeModal) {

    // Pan map to control point location
    if (mapRef.current) {
        panMapToPoint(point, mapRef);
    }

    closeModal();
}