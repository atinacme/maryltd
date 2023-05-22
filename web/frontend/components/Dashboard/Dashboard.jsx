import React from "react";
import { DashboardAction, ViewSpclOrdersAction } from "../Redux";
import { connect } from "react-redux";
import { useNavigate } from "@shopify/app-bridge-react";
import img1 from "../../assets/dashboard.webp";

/*---------------This function is for the left sidebar---------------*/
function Dashboard(props) {
    const navigate = useNavigate();
    return (
        <div className="sidebar-wrap" style={{ display: "flex" }}>
            <div
                className="left-sidebar"
                style={{ backgroundColor: "#373330", height: "100vh" }}
            >
                <ul
                    style={{
                        listStyleType: "none",
                        paddingLeft: "0",
                        margin: "0",
                    }}
                >
                    <div onClick={() => {
                        props.DashboardAction(1);
                        props.ViewSpclOrdersAction(false, "");
                        navigate("/");
                    }}>
                        <li
                            style={{
                                color: "#fff",
                                fontSize: "10px",
                                padding: "10px",
                                fontWeight: "400",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={img1}
                                alt=""
                                style={{ maxWidth: "30px", filter: "invert(1)" }}
                            />
                            Specials
                        </li>
                    </div>
                    <div onClick={() => {
                        props.DashboardAction(2);
                        props.ViewSpclOrdersAction(false, "");
                        navigate("/manufacturer/home");
                    }}>
                        <li
                            style={{
                                color: "#fff",
                                fontSize: "10px",
                                padding: "10px",
                                fontWeight: "400",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={img1}
                                alt=""
                                style={{
                                    maxWidth: "30px",
                                    filter: "invert(1)",
                                }}
                            />
                            Suppliers
                        </li>
                    </div>
                    <div onClick={() => {
                        props.DashboardAction(3);
                        props.ViewSpclOrdersAction(false, "");
                        navigate("/new_task/home");
                    }}>
                        <li
                            style={{
                                color: "#fff",
                                fontSize: "10px",
                                padding: "10px",
                                fontWeight: "400",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={img1}
                                alt=""
                                style={{ maxWidth: "30px", filter: "invert(1)" }}
                            />
                            Task List
                        </li>
                    </div>
                    <li
                        style={{
                            color: "#fff",
                            fontSize: "10px",
                            padding: "10px",
                            fontWeight: "400",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={img1}
                            alt=""
                            style={{ maxWidth: "30px", filter: "invert(1)" }}
                        />
                        Unused
                    </li>
                    <li
                        style={{
                            color: "#fff",
                            fontSize: "10px",
                            padding: "10px",
                            fontWeight: "400",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={img1}
                            alt=""
                            style={{ maxWidth: "30px", filter: "invert(1)" }}
                        />
                        Unused
                    </li>
                    <li
                        style={{
                            color: "#fff",
                            fontSize: "10px",
                            padding: "10px",
                            fontWeight: "400",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={img1}
                            alt=""
                            style={{ maxWidth: "30px", filter: "invert(1)" }}
                        />
                        Unused
                    </li>
                    <li
                        style={{
                            color: "#fff",
                            fontSize: "10px",
                            padding: "10px",
                            fontWeight: "400",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={img1}
                            alt=""
                            style={{ maxWidth: "30px", filter: "invert(1)" }}
                        />
                        Unused
                    </li>
                </ul>
            </div>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        dashboard_tab: state.dashboard_tab
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        DashboardAction: (dashboard_tab) => dispatch(DashboardAction(dashboard_tab)),
        ViewSpclOrdersAction: (view_spcl_orders, view_spcl_orders_manu) => (dispatch(ViewSpclOrdersAction(view_spcl_orders, view_spcl_orders_manu)))
    };
};

/*-------Dashboard function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);