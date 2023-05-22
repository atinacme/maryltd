import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function GetAllManufacturers() {
    return await HttpRequest("GET", `${baseUrl}/api/getAllManufacturers`, null);
};