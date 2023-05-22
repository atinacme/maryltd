import { EDIT_ORDER_DATA } from "../Types";

export function EditOrderDataAction(order_id) {
    return {
        type: EDIT_ORDER_DATA,
        order_id
    };
};