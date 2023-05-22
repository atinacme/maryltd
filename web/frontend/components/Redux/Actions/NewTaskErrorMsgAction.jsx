import { NEW_TASK_ERROR_MSG } from "../Types";

export function NewTaskErrorMsgAction(new_task_company_err, new_task_order_placed_by_err, new_task_order_details_err) {
    return {
        type: NEW_TASK_ERROR_MSG,
        new_task_company_err,
        new_task_order_placed_by_err,
        new_task_order_details_err
    };
};