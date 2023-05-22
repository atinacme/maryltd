import { EMAILTOSUPPLIER } from "../Types";

export function EmailToSupplierAction(email_to_supplier) {
    return {
        type: EMAILTOSUPPLIER,
        email_to_supplier
    };
};