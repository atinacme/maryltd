import { CUSTOMER_DATA } from "../Types";

export function CusPageAction(data, sort, order, searchOn, search, page, item) {
    return {
        type: CUSTOMER_DATA,
        data,
        sort,
        order,
        searchOn,
        search,
        page,
        item
    };
};