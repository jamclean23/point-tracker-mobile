// Send a request to the server to delete an account

// ====== IMPORTS ======


// ====== FUNCTIONS ======

export default async function deleteAccount (token) {
    if (!token) {
        throw new Error('Token required for account deletion');
    }

    controller = new AbortController();
    signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/delete`, {
            headers: {
                Authorization: `Bearer: ${token}`
            },
            method: 'DELETE',
            signal
        });

        const result = await response.json();

        if (!('result' in result && result.result === 'success')) {
            throw new Error('Bad response from server');
        }

        clearTimeout(id);

    } catch (err) {
        clearTimeout(id);
        console.log(err);
        throw new Error('Error when deleting account');
    }
}