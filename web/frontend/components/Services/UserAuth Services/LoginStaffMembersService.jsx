import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function LoginStaffMembersService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/loginStaffMemberData`, data);
};
