import React from "react";
import { Routes, Route } from "react-router-dom";
import NewTaskPageLayout from "./NewTaskPageLayout";
import NewTaskInformation from "./NewTaskInformation";
import Activity from "./Activity";

/*------------This function has routes defined for add manufacturer page-----------------*/
export default function NewTaskPageRouters() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NewTaskPageLayout />}>
                    <Route index={true} element={<NewTaskInformation />} />
                    <Route path="activity" element={<Activity />} />
                </Route>
            </Routes>
        </div>
    );
}
