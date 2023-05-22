import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function GetAllProductsService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/getAllProduct`, data);
};