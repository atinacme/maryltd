import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function NewTaskCreateAndUpdateService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/newTaskCreateAndUpdate`, data);
};