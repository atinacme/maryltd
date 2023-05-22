import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

/*------------Email Order Service for Supplier/Manufacturer-----------*/
export async function EmailOrderService(data) {
    return await HttpRequest("POST", `${baseUrl}/api/emailToManufacturer`, data);
};