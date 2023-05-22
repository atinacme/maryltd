import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function NewTaskAllFilesService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/getAllNewTaskFiles`, data);
};