import { SELECTED_CUSTOMER } from "../Types";

export function Action(payload, clicked, click) {
    return {
        type: SELECTED_CUSTOMER,
        payload,
        clicked,
        click
    };
};