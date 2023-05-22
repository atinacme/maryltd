import { ORDER_PAGE_ON } from "../Types";

export function OrderPageOnAction(orderPageOn) {
    return {
        type: ORDER_PAGE_ON,
        orderPageOn
    };
};