import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function UserOrderActivityCreateService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/userOrderActivityCreate`, data);
};