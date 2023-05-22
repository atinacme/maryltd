import axios from "axios";

export async function HttpRequest(method, url, data) {
    console.log(method, url, data);
    const response = await axios({
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
        },
        url: url,
        data: JSON.stringify(data),
    });
    return response.data;
};