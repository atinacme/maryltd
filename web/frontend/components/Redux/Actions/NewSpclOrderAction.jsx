import { NEW_SPCL_DATA } from "../Types";

export function NewSpclOrderAction(order_create) {
    return {
        type: NEW_SPCL_DATA,
        order_create
    };
};