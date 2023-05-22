import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function NewTaskDeleteService(data) {
    return await HttpRequest("DELETE", `${baseUrl}/api/newTaskDelete`, data);
};