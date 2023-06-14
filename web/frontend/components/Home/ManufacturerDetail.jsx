import React, { useState, useEffect } from "react";
import {
    Card,
    TextField,
    Icon,
} from "@shopify/polaris";
import {
    ArrowUpMinor, ArrowDownMinor
} from '@shopify/polaris-icons';
import { connect } from "react-redux";
import { ManuPageAction, ManufacturerDetailViewAction } from "../Redux";
import { ManufacturerDetailPaginationService } from "../Services";

/*------------This function is for the manufacturer detail tab of special orders page----------------*/
function ManufacturerDetail(props) {
    const [manufacturers, setManufacturers] = useState([]);
    const [manuCompany, setManuCompany] = useState();
    const [manuTag, setManuTag] = useState();
    const [manuPhone, setManuPhone] = useState();
    useEffect(() => {
        const getAllManufacturers = () => {
            try {
                setManufacturers(props.manuPageData.data);
            } catch (e) { }
        };
        getAllManufacturers();
    }, [props.manuPageData]);
    const rowMarkup = manufacturers && manufacturers.map((manufacturer) => (
        <tr key={manufacturer.id} onClick={() => props.ManufacturerDetailViewAction(true, manufacturer.company)}>
            <td>{manufacturer.id}</td>
            <td>{manufacturer.company}</td>
            <td>{manufacturer.tag}</td>
            <td>{manufacturer.phone}</td>
        </tr>
    ));
    const handleManufacturerCompany = async (type, e) => {
        setManuCompany(e);
        const result = await ManufacturerDetailPaginationService(props.manuItemsPerPage, props.manuSort, props.manuSortOrder, type, e, props.manuCurrentPage);
        props.ManuPageAction(result.data, props.manuSort, props.manuSortOrder, type, e, props.manuCurrentPage, props.manuItemsPerPage);
    };
    const handleManufacturerTag = async (type, e) => {
        setManuTag(e);
        const result = await ManufacturerDetailPaginationService(props.manuItemsPerPage, props.manuSort, props.manuSortOrder, type, e, props.manuCurrentPage);
        props.ManuPageAction(result.data, props.manuSort, props.manuSortOrder, type, e, props.manuCurrentPage, props.manuItemsPerPage);
    };
    const handleManufacturerPhone = async (type, e) => {
        setManuPhone(e);
        const result = await ManufacturerDetailPaginationService(props.manuItemsPerPage, props.manuSort, props.manuSortOrder, type, e, props.manuCurrentPage);
        props.ManuPageAction(result.data, props.manuSort, props.manuSortOrder, type, e, props.manuCurrentPage, props.manuItemsPerPage);
    };
    const handleSort = (event) => {
           setManuCompany("");
           setManuTag("");
           setManuPhone("");
        let show = props.manuSortOrder;
        let index = show.indexOf('asc');
        if (index != -1) {
            show = 'desc';
        } else {
            show = 'asc';
        }
        props.ManuPageAction(props.manuPageData, event, show, props.manuSearchField, props.manuSearchData, props.manuCurrentPage, props.manuItemsPerPage);
    };
    const arrowMove =
        <>
            {props.manuSortOrder === "asc" ?
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
                            <th scope="col" onClick={()=>handleSort("id")}><div className="sort-wrap" ><p value="id" data_sort="asc">Id</p>{arrowMove}</div></th>
                            <th scope="col" onClick={()=>handleSort("company")}><div className="sort-wrap" ><p value="company" data_sort="asc">Company</p>{arrowMove}</div></th>
                            <th scope="col" onClick={()=>handleSort("tag")}><div className="sort-wrap" ><p value="tag" data_sort="asc">Tag</p>{arrowMove}</div></th>
                            <th scope="col" onClick={()=>handleSort("phone")}><div className="sort-wrap" ><p value="phone" data_sort="asc">Phone</p>{arrowMove}</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <TextField
                                    value={manuCompany}
                                    onChange={(e) => handleManufacturerCompany("company", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={manuTag}
                                    onChange={(e) => handleManufacturerTag("tag", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={manuPhone}
                                    onChange={(e) => handleManufacturerPhone("phone", e)}
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
        manuPageData: state.manuPageData,
        manuSort: state.manuSort,
        manuSortOrder: state.manuSortOrder,
        manuSearchField: state.manuSearchField,
        manuSearchData: state.manuSearchData,
        manuCurrentPage: state.manuCurrentPage,
        manuItemsPerPage: state.manuItemsPerPage
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        ManuPageAction: (data, sort, order, searchOn, search, page, item) => dispatch(ManuPageAction(data, sort, order, searchOn, search, page, item)),
        ManufacturerDetailViewAction: (manu_detail_view, manu_detail_view_manufacturer) => dispatch(ManufacturerDetailViewAction(manu_detail_view, manu_detail_view_manufacturer))
    };
};

/*-------ManufacturerDetail function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerDetail);