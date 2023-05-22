import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, TextField, Icon } from "@shopify/polaris";
import { ArrowUpMinor, ArrowDownMinor } from '@shopify/polaris-icons';
import { Action, CustomerCompanyAction } from "../../components";
import { connect } from "react-redux";
import { SelectCustomerService } from "../../components";

/*------------This function is for select customer tab in add special order page----------------*/
function SelectCustomer(props) {
    const [customers, setCustomers] = useState([]);
    const [sort, setSort] = useState("customer_id");
    const [sortOrder, setSortOrder] = useState("desc");
    const [cusId, setCusId] = useState();
    const [cusName, setCusName] = useState();
    const [cusCompany, setCusCompany] = useState();
    const [cusEmail, setCusEmail] = useState();
    useEffect(() => {
        const getCustomersData = async () => {
            try {
                const result = await SelectCustomerService(sort, sortOrder, "customer_id", "");
                setCustomers(result.data);
            } catch { }
        };
        getCustomersData();
    }, [sortOrder]);
    const handleCustomerId = async (type, e) => {
        setCusId(e);
        const result = await SelectCustomerService(sort, sortOrder, type, e);
        setCustomers(result.data);
    };
    const handleCustomerName = async (type, e) => {
        setCusName(e);
        const result = await SelectCustomerService(sort, sortOrder, type, e);
        setCustomers(result.data);
    };
    const handleCustomerCompany = async (type, e) => {
        setCusCompany(e);
        const result = await SelectCustomerService(sort, sortOrder, type, e);
        setCustomers(result.data);
    };
    const handleCustomerEmail = async (type, e) => {
        setCusEmail(e);
        const result = await SelectCustomerService(sort, sortOrder, type, e);
        setCustomers(result.data);
    };
    const rowMarkup = customers.length > 0 && customers.map((customer) => (
        <tr key={customer.customer_id}>
            <td>{customer.customer_id}</td>
            <td>{customer.name}</td>
            <td>{customer.company}</td>
            <td>{customer.email}</td>
            <td>
                <Link
                    to="/special_order/pagerouters"
                    onClick={() => {
                        props.Action(
                            customer.company, true, props.click
                        );
                        props.CustomerCompanyAction(
                            customer.company
                        );
                    }}
                >
                    Select
                </Link>
            </td>
        </tr>
    ));
    const handleSort = (e) => {
        setSort(e.target.attributes[0].value);
        let show = sortOrder;
        let index = show.indexOf('asc');
        if (index != -1) {
            show = 'desc';
            setSortOrder("desc");
        } else {
            show = 'asc';
            setSortOrder("asc");
        }
    };
    const arrowMove =
        <>
            {sortOrder === "asc" ?
                <Icon
                    source={ArrowUpMinor}
                    color="base"
                />
                :
                <Icon
                    source={ArrowDownMinor}
                    color="base"
                />
            }
        </>;
    return (
        <div>
            <Card>
                <div className="shorting-wrap">
                    <p className="admin__control-support-text">
                        {customers.length} records found
                    </p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="customer_id" data_sort="asc">ID</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="name" data_sort="asc">Name</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="company" data_sort="asc">Company Name</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="email" data_sort="asc">Email</p>{arrowMove}</div></th>
                            <th scope="col">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                    value={cusId}
                                    onChange={(e) => handleCustomerId("customer_id", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={cusName}
                                    onChange={(e) => handleCustomerName("name", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={cusCompany}
                                    onChange={(e) => handleCustomerCompany("company", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={cusEmail}
                                    onChange={(e) => handleCustomerEmail("email", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td></td>
                        </tr>
                        {rowMarkup}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        customer: state.customer,
        click: state.clickCustomer,
        cust_company: state.cust_company
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        Action: (payload, clicked, click) => dispatch(Action(payload, clicked, click)),
        CustomerCompanyAction: (cust_company) => dispatch(CustomerCompanyAction(cust_company))
    };
};

/*-------SelectCustomer function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(SelectCustomer);
