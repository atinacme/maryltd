import { EDIT_DATA_MANU } from "../Types";

export function EditManuDataAction(manu_id) {
    return {
        type: EDIT_DATA_MANU,
        manu_id
    };
};