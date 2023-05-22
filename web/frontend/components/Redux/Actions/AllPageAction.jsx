import { ALL_DATA } from "../Types";

export function AllPageAction(data, sort, order, searchOn, search, page, item) {
    return {
        type: ALL_DATA,
        data,
        sort,
        order,
        searchOn,
        search,
        page,
        item
    };
};