import { EDIT_NEW_TASK } from "../Types";

export function EditNewTaskAction(new_task_id) {
    return {
        type: EDIT_NEW_TASK,
        new_task_id
    };
};