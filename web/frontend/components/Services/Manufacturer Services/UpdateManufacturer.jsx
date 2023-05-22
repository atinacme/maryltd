import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function UpdateManufacturer(data) {
    return await HttpRequest("PUT", `${baseUrl}/api/manufacturerUpdate`, data);
};