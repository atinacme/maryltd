import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function DeleteOrderService(data) {
    return await HttpRequest("DELETE", `${baseUrl}/api/orderDelete`, data);
};