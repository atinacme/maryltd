import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Tabs, Button, Icon, Checkbox } from "@shopify/polaris";
import { ChevronLeftMinor, ChevronRightMinor, TickMinor } from '@shopify/polaris-icons';
import {
    AllPageAction, CusPageAction, ManuPageAction, NewSpclOrderAction, AllCheckedAction, ViewSpclOrdersAction,
    OrderPageOnAction, CustomerDetailViewAction, ManufacturerDetailViewAction,
    EmailToSupplierAction
} from "../Redux";
import { connect } from "react-redux";
import All from "./All";
import CustomerDetail from "./CustomerDetail";
import ManufacturerDetail from "./ManufacturerDetail";
import {
    AllPaginationService, CustomerDetailPaginationService, ManufacturerDetailPaginationService,
    OrderExceptCompleteGetService, UpdateOrdersService
} from "../Services";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";

/*------------This function contains all three tabs change functionality along with actions, items per page and pagination----------*/
function Home(props) {
    const [selected, setSelected] = useState({
        index: 0,
        component: <All />,
    });
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState();
    const [status, setStatus] = useState(false);
    const [statusValue, setStatusValue] = useState("Not Sent");
    const [submitPopup, setSubmitPopup] = useState(false);
    const [customerEmailPopup, setCustomerEmailPopup] = useState(false);
    const [allOrdersCheck, setAllOrdersCheck] = useState(true);
    let orderIds = [];
    const navigate = useNavigate();
    const location = useLocation();
    const handleTabChange = useCallback((selectedTabIndex) => {
        props.ViewSpclOrdersAction(false, "");
        props.CustomerDetailViewAction(false, "");
        props.ManufacturerDetailViewAction(false, "");
        props.AllPageAction(props.allPageData, "id", "desc", "", "", 1, 2);
        props.CusPageAction(props.cusPageData, "id", "desc", "", "", 1, 2);
        props.ManuPageAction(props.manuPageData, "id", "desc", "", "", 1, 2);
        setSelected({
            index: selectedTabIndex,
            component:
                selectedTabIndex == 0 ? (
                    <All />
                ) : selectedTabIndex == 1 ? (
                    <CustomerDetail />
                ) : (
                    <ManufacturerDetail />
                ),
        });
    }, []);
    const tabs = [
        {
            id: "all-customers-4",
            content: "All",
            accessibilityLabel: "All customers",
            panelID: "all-customers-content-4",
        },
        {
            id: "accepts-marketing-4",
            content: "Customer Detail View",
            panelID: "accepts-marketing-content-4",
        },
        {
            id: "repeat-customers-4",
            content: "Manufacturer Detail View",
            panelID: "repeat-customers-content-4",
        },
    ];
    const handleForAllOrdersCheck = useCallback((newChecked) => setAllOrdersCheck(newChecked), []);
    const handlePageChange = async () => {
        if (selected.index === 0) {
            try {
                if (props.view_spcl_orders === true) {
                    try {
                        if (!allOrdersCheck) {
                            const result = await AllPaginationService(itemsPerPage, props.sort, props.sortOrder, "manufacturer", props.view_spcl_orders_manu, currentPage);
                            setData(result.data);
                            props.AllPageAction(result.data, props.sort, props.sortOrder, props.searchOn, props.search, currentPage, itemsPerPage);
                        } else {
                            const result = await OrderExceptCompleteGetService(itemsPerPage, props.sort, props.sortOrder, "manufacturer", props.view_spcl_orders_manu, currentPage);
                            setData(result.data);
                            props.AllPageAction(result.data, props.sort, props.sortOrder, props.searchOn, props.search, currentPage, itemsPerPage);
                        }
                    } catch { }
                } else {
                    try {
                        if (!allOrdersCheck) {
                            const result = await AllPaginationService(itemsPerPage, props.sort, props.sortOrder, props.searchOn, props.search, currentPage);
                            setData(result.data);
                            props.AllPageAction(result.data, props.sort, props.sortOrder, props.searchOn, props.search, currentPage, itemsPerPage);
                        } else {
                            const result = await OrderExceptCompleteGetService(itemsPerPage, props.sort, props.sortOrder, props.searchOn, props.search, currentPage);
                            setData(result.data);
                            props.AllPageAction(result.data, props.sort, props.sortOrder, props.searchOn, props.search, currentPage, itemsPerPage);
                        }
                    } catch { }
                }
            } catch { }
        } else if (selected.index === 1) {
            try {
                if (props.cust_detail_view === true) {
                    const result = await AllPaginationService(itemsPerPage, props.sort, props.sortOrder, "customer", props.cust_detail_view_customer, currentPage);
                    setData(result.data);
                    props.AllPageAction(result.data, props.sort, props.sortOrder, props.searchOn, props.search, currentPage, itemsPerPage);
                } else {
                    const result = await CustomerDetailPaginationService(itemsPerPage, props.cusSort, props.cusSortOrder, props.cusSearchField, props.cusSearchData, currentPage);
                    setData(result.data);
                    props.CusPageAction(result.data, props.cusSort, props.cusSortOrder, props.cusSearchField, props.cusSearchData, currentPage, itemsPerPage);
                }
            } catch { }
        } else {
            try {
                if (props.manu_detail_view === true) {
                    const result = await AllPaginationService(itemsPerPage, props.sort, props.sortOrder, "manufacturer", props.manu_detail_view_manufacturer, currentPage);
                    setData(result.data);
                    props.AllPageAction(result.data, props.sort, props.sortOrder, props.searchOn, props.search, currentPage, itemsPerPage);
                } else {
                    const result = await ManufacturerDetailPaginationService(itemsPerPage, props.manuSort, props.manuSortOrder, props.manuSearchField, props.manuSearchData, currentPage);
                    setData(result.data);
                    props.ManuPageAction(result.data, props.manuSort, props.manuSortOrder, props.manuSearchField, props.manuSearchData, currentPage, itemsPerPage);
                }
            } catch { }
        }
    };
    useEffect(() => {
        handlePageChange();
        const timer = setTimeout(() => {
            props.NewSpclOrderAction(false);
            props.EmailToSupplierAction(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [itemsPerPage, props.sort, props.sortOrder, props.cusSort, props.cusSortOrder, props.manuSort, props.manuSortOrder, currentPage, selected.index, location.key, props.view_spcl_orders, props.cust_detail_view, props.manu_detail_view, allOrdersCheck]);
    const handleClose = () => setSubmitPopup(false);
    const handleCloseCustomerEmailPopup = () => setCustomerEmailPopup(false);
    const handleCloseCustomerEmailCancel = async () => {
        setCustomerEmailPopup(false);
        if (props.check.length > 0) {
            try {
                props.check.forEach(element => {
                    if (orderIds.indexOf(element.id) === -1) {
                        orderIds.push(element.id);
                    }
                });
                const data = {
                    order_id: orderIds,
                    status: statusValue,
                    email_notify: false
                };
                const result = await UpdateOrdersService(data);
                if (result) {
                    setCustomerEmailPopup(false);
                    navigate("/special_order/home");
                    props.AllCheckedAction([]);
                }
            } catch { }
        } else {
            setSubmitPopup(true);
        }
    };
    const handleActionSubmit = async () => {
        if (props.check.length > 0) {
            try {
                props.check.forEach(element => {
                    if (orderIds.indexOf(element.id) === -1) {
                        orderIds.push(element.id);
                    }
                });
                if (statusValue !== "completed") {
                    const data = {
                        order_id: orderIds,
                        status: statusValue,
                        email_notify: false
                    };
                    const result = await UpdateOrdersService(data);
                    if (result) {
                        navigate("/special_order/home");
                        props.AllCheckedAction([]);
                    }
                } else {
                    setCustomerEmailPopup(true);
                }
            } catch { }
        } else {
            setSubmitPopup(true);
        }
    };
    const handleSendEmailToCustomer = async () => {
        if (props.check.length > 0) {
            try {
                props.check.forEach(element => {
                    if (orderIds.indexOf(element.id) === -1) {
                        orderIds.push(element.id);
                    }
                });
                const data = {
                    order_id: orderIds,
                    status: statusValue,
                    email_notify: true
                };
                const result = await UpdateOrdersService(data);
                if (result) {
                    setCustomerEmailPopup(false);
                    navigate("/special_order/home");
                    props.AllCheckedAction([]);
                }
            } catch { }
        } else {
            setSubmitPopup(true);
        }
    };
    return (
        <div className="tab-wrapper">
            <Card>
                <div className="add_special_order spc-order_wrap">
                    <Button onClick={() => { navigate("/special_order/pagerouters"); props.NewSpclOrderAction(false); props.OrderPageOnAction("add"); }}>Add Special Order</Button>
                </div>
                <Tabs
                    tabs={tabs}
                    selected={props.view_spcl_orders === true ? 2 : props.cust_detail_view === true ? 1 : props.manu_detail_view === true ? 2 : selected.index}
                    onSelect={handleTabChange}
                    disclosureText="More views"
                >
                    <div className="shorting-wrap home-wrap">
                        {selected.index === 0 && (
                            <>
                                <div className="short-status-wrap">
                                    <div className="shorting-left">
                                        <div className="select_drop">
                                            <div className="cust-select select">
                                                <select onChange={(e) => { if (e.target.value === "change_status") { setStatus(true); } else setStatus(false); }} name="format" id="format">
                                                    <option value="">Actions</option>
                                                    <option value="change_status">Change Status</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {status &&
                                        <div className="status-wrap">
                                            <p>Status</p>
                                            <div className="cust-select select">
                                                <select onChange={(e) => setStatusValue(e.target.value)} name="format" id="format">
                                                    <option value="not_sent" defaultValue="not_sent">Not sent</option>
                                                    <option value="sent_to_supplier">Sent to supplier</option>
                                                    <option value="on_hold">On hold</option>
                                                    <option value="partially_arrived">Partially arrived</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                            <button onClick={handleActionSubmit}>Submit</button>
                                        </div>
                                    }
                                </div>
                                <Modal className="modal-attention" show={submitPopup} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Attention</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>An item needs to be selected. Select and try again.</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            OK
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal className="modal-attention" show={customerEmailPopup} onHide={handleCloseCustomerEmailPopup}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Order Email Notification</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Do you want to send Email for the orders to their customers ?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleSendEmailToCustomer}>
                                            Yes
                                        </Button>
                                        <Button variant="secondary" onClick={handleCloseCustomerEmailCancel}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        )}
                        <p className="admin__control-support-text">
                            {data && data.total} records found {props.check.length > 0 ? `(${props.check.length} selected)` : ""}
                        </p>
                        <div className="sorting-right">
                            <div className="soryby-wrap">
                                <div className="cust-select select">
                                    <select onChange={(e) => { setItemsPerPage(e.target.value); setCurrentPage(1); }} value={itemsPerPage} name="format" id="format">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                    </select>
                                </div>
                            </div>
                            <p>per page</p>
                            {data &&
                                <>
                                    <div className={data.current_page === 1 ? "arrow-wrap disabled" : "arrow-wrap"} onClick={() => {
                                        setCurrentPage(currentPage - 1);
                                    }}>
                                        <Icon
                                            source={ChevronLeftMinor}
                                            color="base"
                                        />
                                    </div>
                                    <div className="current-page-wrap">{data.current_page}</div> of {data.last_page}
                                    <div className={data.current_page === data.last_page ? "disabled" : "arrow-wrap"} onClick={() => {
                                        setCurrentPage(currentPage + 1);
                                    }}>
                                        <Icon
                                            source={ChevronRightMinor}
                                            color="base"
                                        />
                                    </div>
                                </>
                            }
                        </div>
                        <div className="soryby-wrap hideWrap">
                            <Checkbox
                                checked={allOrdersCheck}
                                onChange={handleForAllOrdersCheck}
                            />Hide Completed Orders
                        </div>
                    </div>
                    {props.order_create === true &&
                        <div className="messages">
                            <Icon
                                source={TickMinor}
                                color="base"
                            />
                            <div className="messages-success">Order Saved Successfully</div>
                        </div>
                    }
                    {props.email_to_supplier === true &&
                        <div className="messages">
                            <Icon
                                source={TickMinor}
                                color="base"
                            />
                            <div className="messages-success">Email Sent Successfully</div>
                        </div>
                    }
                    <Card.Section>{props.cust_detail_view === true ? <All /> : props.manu_detail_view === true ? <All /> : selected.component}</Card.Section>
                </Tabs>
            </Card>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        customer: state.customer,
        clicked: state.click,
        allData: state.allPageData,
        sort: state.sort,
        sortOrder: state.sortOrder,
        check: state.allPageChecked,
        searchOn: state.searchField,
        search: state.searchData,
        cusPageData: state.cusPageData,
        cusSort: state.cusSort,
        cusSortOrder: state.cusSortOrder,
        cusSearchField: state.cusSearchField,
        cusSearchData: state.cusSearchData,
        cusCurrentPage: state.cusCurrentPage,
        cusItemsPerPage: state.cusItemsPerPage,
        manuPageData: state.manuPageData,
        manuSort: state.manuSort,
        manuSortOrder: state.manuSortOrder,
        manuSearchField: state.manuSearchField,
        manuSearchData: state.manuSearchData,
        manuCurrentPage: state.manuCurrentPage,
        manuItemsPerPage: state.manuItemsPerPage,
        order_create: state.order_create,
        view_spcl_orders: state.view_spcl_orders,
        view_spcl_orders_manu: state.view_spcl_orders_manu,
        cust_detail_view: state.cust_detail_view,
        cust_detail_view_customer: state.cust_detail_view_customer,
        manu_detail_view: state.manu_detail_view,
        manu_detail_view_manufacturer: state.manu_detail_view_manufacturer,
        email_to_supplier: state.email_to_supplier
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        AllPageAction: (data, sort, order, searchOn, search, page, item) => dispatch(AllPageAction(data, sort, order, searchOn, search, page, item)),
        CusPageAction: (data, sort, order, searchOn, search, page, item) => dispatch(CusPageAction(data, sort, order, searchOn, search, page, item)),
        ManuPageAction: (data, sort, order, searchOn, search, page, item) => dispatch(ManuPageAction(data, sort, order, searchOn, search, page, item)),
        NewSpclOrderAction: (order_create) => dispatch(NewSpclOrderAction(order_create)),
        AllCheckedAction: (checked) => dispatch(AllCheckedAction(checked)),
        ViewSpclOrdersAction: (view_spcl_orders, view_spcl_orders_manu) => (dispatch(ViewSpclOrdersAction(view_spcl_orders, view_spcl_orders_manu))),
        OrderPageOnAction: (orderPageOn) => (dispatch(OrderPageOnAction(orderPageOn))),
        CustomerDetailViewAction: (cust_detail_view, cust_detail_view_customer) => dispatch(CustomerDetailViewAction(cust_detail_view, cust_detail_view_customer)),
        ManufacturerDetailViewAction: (manu_detail_view, manu_detail_view_manufacturer) => dispatch(ManufacturerDetailViewAction(manu_detail_view, manu_detail_view_manufacturer)),
        EmailToSupplierAction: (email_to_supplier) => (dispatch(EmailToSupplierAction(email_to_supplier)))
    };
};

/*-------Home function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(Home);