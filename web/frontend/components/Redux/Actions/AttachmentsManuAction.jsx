import { ATTACHMENTS_MANU } from "../Types";

export function AttachmentsManuAction(attachments, attachments_notes) {
    return {
        type: ATTACHMENTS_MANU,
        attachments,
        attachments_notes
    };
};