import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function NewTaskActivityCreateService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/newTaskActivityCreate`, data);
};