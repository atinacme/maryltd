import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function UserDataService(data) {
    return await HttpRequest("POST", `${baseUrl}/api`, data);
};