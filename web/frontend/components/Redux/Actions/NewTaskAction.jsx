import { NEW_TASK_DATA } from "../Types";

export function NewTaskAction(new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at) {
    return {
        type: NEW_TASK_DATA,
        new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at
    };
};