import { DASHBOARD_TAB } from "../Types";

export function DashboardAction(dashboard_tab) {
    return {
        type: DASHBOARD_TAB,
        dashboard_tab
    };
};