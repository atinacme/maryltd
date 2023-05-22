import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function AddCustomersDataService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/customers`, data);
};