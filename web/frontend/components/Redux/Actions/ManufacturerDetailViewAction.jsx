import { MANUFACTURER_DETAIL_VIEW } from "../Types";

export function ManufacturerDetailViewAction(manu_detail_view, manu_detail_view_manufacturer) {
    return {
        type: MANUFACTURER_DETAIL_VIEW,
        manu_detail_view,
        manu_detail_view_manufacturer
    };
};