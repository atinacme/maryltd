import React, { useState, useEffect } from "react";
import { Card, TextField, Icon } from "@shopify/polaris";
import { ArrowUpMinor, ArrowDownMinor } from '@shopify/polaris-icons';
import { useNavigate } from "@shopify/app-bridge-react";
import { Action, ManufacturersAction } from "../../components";
import { connect } from "react-redux";
import { SelectManufacturerService } from "../../components";

/*------------This function is for select manufacturer tab in add special order page----------------*/
function SelectManufacturer(props) {
    const [manufacturers, setManufacturers] = useState([]);
    const [sort, setSort] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");
    const [manuCompany, setManuCompany] = useState();
    const [manuTag, setManuTag] = useState();
    const [manuPhone, setManuPhone] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const getManufacturers = async () => {
            try {
                const result = await SelectManufacturerService(sort, sortOrder, "id", "");
                setManufacturers(result.data);
            } catch (e) { }
        };
        getManufacturers();
    }, [sortOrder]);
    const handleManufacturerCompany = async (type, e) => {
        setManuCompany(e);
        const result = await SelectManufacturerService(sort, sortOrder, type, e);
        setManufacturers(result.data);
    };
    const handleManufacturerTag = async (type, e) => {
        setManuTag(e);
        const result = await SelectManufacturerService(sort, sortOrder, type, e);
        setManufacturers(result.data);
    };
    const handleManufacturerPhone = async (type, e) => {
        setManuPhone(e);
        const result = await SelectManufacturerService(sort, sortOrder, type, e);
        setManufacturers(result.data);
    };

    const handleMouseEnter = (value,event)=>{
        if(value == "enter"){
        event.target.style.color = "#ba4000";
        } else{
            event.target.style.color = "#007bdb";
        }
    }

    const rowMarkup = manufacturers.length > 0 && manufacturers.map((manufacturer) => (
        <tr key={manufacturer.id}>
            <td>{manufacturer.id}</td>
            <td>{manufacturer.company}</td>
            <td>{manufacturer.tag}</td>
            <td>{manufacturer.phone}</td>
            <td>
                <div
                style={{cursor:"pointer"}}
                    onClick={() => {
                        props.Action(
                            props.customer, true, props.click
                        );
                        props.ManuAction(
                            manufacturer.company, false
                        );
                        navigate("/special_order/pagerouters");
                    }}

                    onMouseEnter={(e)=>handleMouseEnter("enter",e)}
                                onMouseLeave={(e)=>handleMouseEnter("leave",e)}
                >
                    Select
                </div>
            </td>
        </tr>
    ));
    const handleSort = (event) => {
            setManuCompany("");
            setManuTag("");
            setManuPhone("");
        setSort(event);
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
                        {manufacturers.length} records found
                    </p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" onClick={()=>handleSort("id")}><div className="sort-wrap" ><p value="id" data_sort="asc">ID</p>{arrowMove}</div></th>
                            <th scope="col" onClick={()=>handleSort("company")}><div className="sort-wrap" ><p value="company" data_sort="asc">Company Name</p>{arrowMove}</div></th>
                            <th scope="col" onClick={()=>handleSort("tag")}><div className="sort-wrap" ><p value="tag" data_sort="asc">Tag</p>{arrowMove}</div></th>
                            <th scope="col" onClick={()=>handleSort("phone")}><div className="sort-wrap" ><p value="phone" data_sort="asc">Phone</p>{arrowMove}</div></th>
                            <th scope="col">Select</th>
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
        clicked: state.click,
        manu: state.manufacturer,
        clickManu: state.manuClick
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        Action: (payload, clicked, click) => dispatch(Action(payload, clicked, click)),
        ManuAction: (name, click) => dispatch(ManufacturersAction(name, click)),
    };
};

/*-------SelectManufacturer function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(SelectManufacturer);
