// Measures time until response from server

// ====== FUNCTIONS ======

/**
 * 
 * @returns Duration of time in ms of how long it takes to receive a response from the server
 */
export default async function ping () {
    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);

    try {
        const startTime = Date.now();
        const response = await fetch(`${process.env.SERVER_DOMAIN}/index/status`, {
            signal
        });
        const pingTime = Date.now() - startTime;
        clearTimeout(id);
        return pingTime;
    } catch (err) {
        console.log(err);
        clearTimeout(id);
        throw new Error('Error in pinging server');
    }
}