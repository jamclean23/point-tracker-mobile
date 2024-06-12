// Attempts to retrieve sites from server. If failed, recurses after timeout.
export default async function retrieveSites (setSites, userToken) {

    const controller = new AbortController();
    const signal = controller.signal;
    const fetchId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/index/get_sites`, {
            headers: {
                Authorization: `Bearer: ${userToken}`
            },
            signal
        });
        const result = await response.json();

        if ('sites' in result) {
            setSites(result.sites);
        } else {
            setTimeout(() => retrieveSites(setSites, userToken), 5000);
        }
        clearTimeout(fetchId);

    } catch (err) {
        console.log(err);
        clearTimeout(fetchId);
        setTimeout(() => retrieveSites(setSites, userToken), 5000);
    }
}