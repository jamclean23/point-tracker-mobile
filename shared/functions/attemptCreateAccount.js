// Submit Request form to server to create an account
/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {String} confirmPassword 
 * @param {String} firstName 
 * @param {String} lastName 
 * @param {String} email 
 * @param {String} phoneNum 
 * @param {String} note 
 */
export default async function attemptCreateAccount (
    newUsername,
    newPassword,
    confirmPassword,
    firstName,
    lastName,
    email,
    phoneNum,
    note
) {

    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/create`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                newUsername,
                newPassword,
                confirmPassword,
                firstName,
                lastName,
                email,
                phoneNum,
                note
            }),
            signal
        });
        const result = await response.json();
        clearTimeout(id);
        return result;
    } catch (err) { 
        clearTimeout(id);
        throw new Error(err);
    }

}