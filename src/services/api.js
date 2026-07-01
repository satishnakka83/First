const BASE_URL = "https://dev.zuget.com";


const getAuthHeaders = () => {

    if (typeof window === "undefined") {
        return {};
    }

    const phone = localStorage.getItem("user_phone");

    const token = localStorage.getItem(
        `${phone}_token`
    );

    return {

        accept: "application/json",

        Authorization: token
            ? `${token}`
            : ""
    };
};



export const apiRequest = async ({
    endpoint,
    method = "GET",
    body = null,
    params = {}
}) => {

    try {
        let url = `${BASE_URL}${endpoint}`;

        // query params
        const query = new URLSearchParams(params)
            .toString();


        if (query) {
            url += `?${query}`;
        }
        const response = await fetch(url, {

            method,
            headers: {
                ...getAuthHeaders(),
                "Content-Type":
                    "application/json"
            },
            body:
                body
                    ? JSON.stringify(body)
                    : null
        });
        const data = await response.json();
        if (!response.ok) {

            throw new Error(
                data.message || "API Error"
            );
        }

        return data;

    }

    catch (error) {
        console.log(
            "API ERROR:",
            error
        );
        throw error;
    }
};