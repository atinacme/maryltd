import { CUSTOMER_DETAIL_VIEW } from "../Types";

export function CustomerDetailViewAction(cust_detail_view, cust_detail_view_customer) {
    return {
        type: CUSTOMER_DETAIL_VIEW,
        cust_detail_view,
        cust_detail_view_customer
    };
};