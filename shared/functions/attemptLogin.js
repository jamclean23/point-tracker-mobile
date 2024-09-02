// Send Fetch request to server to attempt login

// ====== IMPORTS ======

import { SERVER_DOMAIN } from '@env';

// ====== FUNCTIONS/EXPORT

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
export default async function attemptLogin (username, password) {
    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(`${SERVER_DOMAIN}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            }),
            signal
        });

        clearTimeout(id);
        const result = await response.json();
        return result;
    } catch (err) {
        clearTimeout(id);
        console.log(err);
        throw new Error(err);
    }
}