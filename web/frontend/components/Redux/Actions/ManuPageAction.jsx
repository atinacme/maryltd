import { MANUFACTURER_PAGE_DATA } from "../Types";

export function ManuPageAction(data, sort, order, searchOn, search, page, item) {
    return {
        type: MANUFACTURER_PAGE_DATA,
        data,
        sort,
        order,
        searchOn,
        search,
        page,
        item
    };
};