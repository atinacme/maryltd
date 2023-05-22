import { HttpRequest } from "../Http Request Service";

const baseUrl = window.location.origin;

export async function UserOrderActivityGetService(user_order_data_id, per_page, order_field, order_type, searchField, searchData, page_no) {
    return await HttpRequest("GET", `${baseUrl}/api/getUserOrderActivity/${user_order_data_id}/${per_page}/${order_field}/${order_type}/${searchField}/${searchData}?page=${page_no}`);
};