import { CUSTOMER_COMPANY } from "../Types";

export function CustomerCompanyAction(cust_company) {
    return {
        type: CUSTOMER_COMPANY,
        cust_company
    };
};