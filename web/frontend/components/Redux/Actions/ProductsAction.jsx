import { PRODUCT_DATA } from "../Types";

export function ProductsAction(src, click) {
    return {
        type: PRODUCT_DATA,
        src,
        click
    };
};