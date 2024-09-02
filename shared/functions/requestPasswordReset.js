// Sends request for server to send password reset email

// ====== FUNCTIONS/EXPORT ======

/**
 * 
 * @param {String} email 
 * @returns Server response
 */

export default async function requestPasswordReset (email) {
    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/password_reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email}),
            signal
        });

        clearTimeout(id);
        const result = await response.json();
        return result;
    } catch (err) {
        clearTimeout(id);
        console.error('An error occurred in requestPasswordReset.js:', err.message);
        console.error('Error stack trace:', err.stack);
        return {
            error: err
        }
    }
}