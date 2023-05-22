import { ALL_CHECKED_DATA } from "../Types";

export function AllCheckedAction(checked) {
    return {
        type: ALL_CHECKED_DATA,
        checked
    };
};