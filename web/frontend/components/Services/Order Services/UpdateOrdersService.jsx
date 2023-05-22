import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function UpdateOrdersService(data) {
    return await HttpRequest("PUT", `${baseUrl}/api/orderUpdate`, data);
};