import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function NewTaskParticularGetService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/getParticularNewTaskData`, data);
};