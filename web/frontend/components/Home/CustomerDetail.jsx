import React, { useState, useEffect } from "react";
import {
    Card,
    TextField,
    Icon
} from "@shopify/polaris";
import {
    ArrowUpMinor, ArrowDownMinor
} from '@shopify/polaris-icons';
import { connect } from "react-redux";
import { CusPageAction, CustomerDetailViewAction } from "../Redux";
import { CustomerDetailPaginationService } from "../Services/Pagination Services/CustomerDetailPaginationService";

/*---------------This function is for the customer detail tab of special orders page-------------*/
function CustomerDetail(props) {
    const [customers, setCustomers] = useState([]);
    const [cusId, setCusId] = useState();
    const [cusName, setCusName] = useState();
    const [cusEmail, setCusEmail] = useState();
    useEffect(() => {
        const getAllCustomers = () => {
            try {
                setCustomers(props.cusPageData.data);
            } catch (e) { }
        };
        getAllCustomers();
    }, [props.cusPageData]);
    const handleCustomerId = async (type, e) => {
        setCusId(e);
        const result = await CustomerDetailPaginationService(props.cusItemsPerPage, props.cusSort, props.cusSortOrder, type, e, props.cusCurrentPage);
        props.CusPageAction(result.data, props.cusSort, props.cusSortOrder, type, e, props.cusCurrentPage, props.cusItemsPerPage);
    };
    const handleCustomerName = async (type, e) => {
        setCusName(e);
        const result = await CustomerDetailPaginationService(props.cusItemsPerPage, props.cusSort, props.cusSortOrder, type, e, props.cusCurrentPage);
        props.CusPageAction(result.data, props.cusSort, props.cusSortOrder, type, e, props.cusCurrentPage, props.cusItemsPerPage);
    };
    const handleCustomerEmail = async (type, e) => {
        setCusEmail(e);
        const result = await CustomerDetailPaginationService(props.cusItemsPerPage, props.cusSort, props.cusSortOrder, type, e, props.cusCurrentPage);
        props.CusPageAction(result.data, props.cusSort, props.cusSortOrder, type, e, props.cusCurrentPage, props.cusItemsPerPage);
    };
    const rowMarkup = customers && customers.map((customer) => (
        <tr key={customer.customer_id} onClick={() => props.CustomerDetailViewAction(true, customer.name)}>
            <td>{customer.customer_id}</td>
            <td>{customer.company}</td>
            <td>{customer.email}</td>
        </tr>
    ));
    const handleSort = (e) => {
        setCusId("");
        setCusName("");
        setCusEmail("");
        let show = props.cusSortOrder;
        let index = show.indexOf('asc');
        if (index != -1) {
            show = 'desc';
        } else {
            show = 'asc';
        }
        props.CusPageAction(props.cusPageData, e.target.attributes[0].value, show, props.cusSearchField, props.cusSearchData, props.cusCurrentPage, props.cusItemsPerPage);
    };
    const arrowMove =
        <>
            {props.cusSortOrder === "asc" ?
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><div className="sort-wrap" onClick={handleSort}><p value="customer_id" data_sort="asc">Id</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap" onClick={handleSort}><p value="name" data_sort="asc">Name</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap" onClick={handleSort}><p value="email" data_sort="asc">Email</p>{arrowMove}</div></th>
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
                                    value={cusEmail}
                                    onChange={(e) => handleCustomerEmail("email", e)}
                                    autoComplete="off"
                                />
                            </td>
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
        clicked: state.click,
        pageCount: state.pageCount,
        allData: state.allPageData,
        cusPageData: state.cusPageData,
        cusSort: state.cusSort,
        cusSortOrder: state.cusSortOrder,
        cusSearchField: state.cusSearchField,
        cusSearchData: state.cusSearchData,
        cusCurrentPage: state.cusCurrentPage,
        cusItemsPerPage: state.cusItemsPerPage
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        CusPageAction: (data, sort, order, searchOn, search, page, item) => dispatch(CusPageAction(data, sort, order, searchOn, search, page, item)),
        CustomerDetailViewAction: (cust_detail_view, cust_detail_view_customer) => dispatch(CustomerDetailViewAction(cust_detail_view, cust_detail_view_customer))
    };
};

/*-------CustomerDetail function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);