// Send Fetch request to server to attempt login

export default async function attemptLogin (username, password) {
    try {
        const response = await fetch(`${process.env.SERVER_DOMAIN}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}