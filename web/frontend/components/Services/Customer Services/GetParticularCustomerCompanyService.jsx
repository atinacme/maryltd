import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function GetParticularCustomerCompanyService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/getParticularCustomerCompanyData`, data);
};