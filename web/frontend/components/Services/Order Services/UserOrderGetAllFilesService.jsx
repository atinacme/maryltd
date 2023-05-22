import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function UserOrderGetAllFilesService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/getAllUserOrderFiles`, data);
};