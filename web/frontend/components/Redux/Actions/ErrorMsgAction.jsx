import { ERROR_MSG } from "../Types";

export function ErrorMsgAction(stock_err, quantity_err, karat_err, colour_err, size_err, desc_err, customer_err, manufacturer_err) {
    return {
        type: ERROR_MSG,
        stock_err,
        quantity_err,
        karat_err,
        colour_err,
        size_err,
        desc_err,
        customer_err,
        manufacturer_err
    };
};