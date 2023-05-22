import { MANU_PAGE_ON } from "../Types";

export function ManuPageOnAction(manuPageOn) {
    return {
        type: MANU_PAGE_ON,
        manuPageOn
    };
};