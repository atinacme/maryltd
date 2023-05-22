import { SPCL_DATA } from "../Types";

export function SpclOrderAction(status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy) {
    return {
        type: SPCL_DATA,
        status,
        stock,
        quantity,
        karat,
        colour,
        size,
        desc,
        cust_notes,
        scanned_copy
    };
};