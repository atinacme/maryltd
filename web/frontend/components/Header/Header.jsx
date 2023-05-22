import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@shopify/polaris";
import { CustomersMajor, DropdownMinor } from '@shopify/polaris-icons';
import { connect } from "react-redux";
import { useNavigate } from "@shopify/app-bridge-react";

/*-----------This function is for Header of special orders page-----------------*/
function Header(props) {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const [logoutDrop, setLogoutDrop] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setLogoutDrop(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    const handleLogout = (e) => {
        localStorage.removeItem("authenticated");
        navigate("/user_auth");
        setLogoutDrop(false);
    };
    return (
        <div className="main-content" style={{ width: "100%" }}>
            <div
                className="header"
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between"
                }}
            >
                <h2 style={{ fontSize: "28px", fontWeight: "700" }}>
                    {props.dashboard_tab === 1 ?
                        <>{props.orderPageOn === "home" ? "Manage Special Orders" : props.orderPageOn === "add" ? "New Special Order" : "Edit Special Order"}</>
                        : props.dashboard_tab === 2 ?
                            <>{props.manuPageOn === "home" ? "Manage Manufacturers" : props.manuPageOn === "add" ? "Add Manufacturer" : "Edit Manufacturer"}</>
                            : <>{props.newTaskPageOn === "home" ? "Task List" : props.newTaskPageOn === "add" ? "Add New Task" : "Edit Task"}</>
                    }
                </h2>
                <div>
                    <div style={{ display: "flex", fontWeight: "700" }} onClick={() => setLogoutDrop(true)}>
                        <Icon source={CustomersMajor} color="base" />
                        <p>{props.staff_member}</p>
                        <Icon source={DropdownMinor} color="base" />
                    </div>
                    {logoutDrop ? <div style={{ margin: "10px", border: "1px solid #000", padding: "5px" }} ref={wrapperRef} onClick={handleLogout}>Logout</div> : null}
                </div>
            </div>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        dashboard_tab: state.dashboard_tab,
        staff_member: state.staff_member,
        orderPageOn: state.orderPageOn,
        manuPageOn: state.manuPageOn,
        newTaskPageOn: state.newTaskPageOn
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
    };
};

/*-------Header function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(Header);