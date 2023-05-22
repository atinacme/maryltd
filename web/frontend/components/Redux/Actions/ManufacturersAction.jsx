import { MANUFACTURER_DATA } from "../Types";

export function ManufacturersAction(name, click) {
    return {
        type: MANUFACTURER_DATA,
        name,
        click
    };
};