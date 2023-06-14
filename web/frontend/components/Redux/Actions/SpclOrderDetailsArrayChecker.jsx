import { SPCL_ORDER_DETAILS_CHK } from "../Types";

export function SpclOrderDetailsArrayCheckerAction(spcl_order_details_array_checker) {
    return {
        type: SPCL_ORDER_DETAILS_CHK,
        spcl_order_details_array_checker
    };
};