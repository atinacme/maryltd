import { VIEW_SPCL_ORDERS } from "../Types";

export function ViewSpclOrdersAction(view_spcl_orders, view_spcl_orders_manu) {
    return {
        type: VIEW_SPCL_ORDERS,
        view_spcl_orders,
        view_spcl_orders_manu
    };
};