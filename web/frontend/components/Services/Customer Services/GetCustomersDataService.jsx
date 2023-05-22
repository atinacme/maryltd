import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function GetCustomersDataService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/customers`, data);
};