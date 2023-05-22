import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function CreateManufacturer(data) {
    return await HttpRequest("POST", `${baseUrl}/api/manufacturerCreate`, data);
};