import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function UpdateStaffMemberPasswordService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/updateStaffMemberPassword`, data);
};