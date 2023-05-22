import { NEW_TASK_PAGE_ON } from "../Types";

export function NewTaskPageOnAction(newTaskPageOn) {
    return {
        type: NEW_TASK_PAGE_ON,
        newTaskPageOn
    };
};