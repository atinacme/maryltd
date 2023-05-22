import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function DeleteManufacturer(data) {
    return await HttpRequest("DELETE", `${baseUrl}/api/manufacturerDelete`, data);
};