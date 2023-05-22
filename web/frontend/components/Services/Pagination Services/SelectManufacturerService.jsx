import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function SelectManufacturerService(order_field, order_type, searchField, searchData) {
    return await HttpRequest("GET", `${baseUrl}/api/getAllManufacturersApi/${order_field}/${order_type}/${searchField}/${searchData}`, null);
};