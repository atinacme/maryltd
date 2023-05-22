import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function AddStaffMembersService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/staffMembers`, data);
};