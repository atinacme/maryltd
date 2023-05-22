import { USER_AUTH } from "../Types";

export function UserAuthAction(user_auth, shop, shop_owner, staff_member_logged_in) {
    return {
        type: USER_AUTH,
        user_auth, shop, shop_owner, staff_member_logged_in
    };
};