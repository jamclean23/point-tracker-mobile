// Send Fetch request to server to attempt login

export default async function attemptLogin (username, password) {
    const controller = new AbortController();
    const signal = controller.signal;
    const id = setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
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