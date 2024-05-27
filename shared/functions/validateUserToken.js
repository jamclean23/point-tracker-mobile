// Submits the jwt to the server


/**
 * 
 * @param {String} token
 * @returns User object, or Object containing an array of errors
 */
export default async function validateUserToken (token) {
    // Fail conditions
    if (!(typeof token === 'string')) {
        throw new Error('Token is not a string');
    }


    // Fetch Timeout controller
    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);


    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/jwt_authenticate`, {
            headers: {
                Authorization: `Bearer: ${token}`
            },
            signal
        });

        clearTimeout(id);

        const result = await response.json();
        return result;
    } catch (err) {
        clearTimeout(id);
        console.log(err);
        return {errors: [err]}
    }
}