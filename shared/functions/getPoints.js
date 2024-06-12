// Retrieves point information from server, given a site id

// ====== IMPORTS ======

// Functions
import sleep from "./sleep";


// ====== FUNCTIONS ======
/**
 * 
 * @param {*} siteId 
 * @param {*} token 
 * @param {*} setPoints 
 */
export default async function getPoints (siteId, token) {
    // Fail conditions
    if (
        !siteId
        || !(typeof siteId === 'string')
        || !token
        || !(typeof token === 'string')
    ) {
        throw new Error('Invalid arguments');
    }


    // Request timeout setup
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchTimeoutId = setTimeout(() => controller.abort(), 4000);

    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/index/get_points`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            signal,
            body: JSON.stringify({
                siteId: siteId
            })
        });
        const result = await response.json();

        if ('points' in result) {
            return result.points;
        } else {
            throw new Error('No points in response.');
        }

    } catch (err) {
        clearTimeout(fetchTimeoutId);
        console.log(err);
        await sleep(4000);
        return getPoints(siteId, token);
    }
}