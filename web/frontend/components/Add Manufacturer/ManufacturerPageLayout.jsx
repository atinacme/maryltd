import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Icon, Button } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import { AllDataManuAction, EditManuDataAction, ManuPageOnAction, AttachmentsManuAction } from "../Redux";
import { connect } from "react-redux";
import { CreateManufacturer, DeleteManufacturer, UpdateManufacturer } from "../Services";

/*-----------This function contains the page layout in which the first and second tabs are integrated in one page 
along with back, reset, save and continue edit, save manufacturer button functionality------------------------------*/
const ManufacturerPageLayout = (props) => {
    const [firstPageClass, setFirstPageClass] = useState("active_hover-class");
    const [secondPageClass, setSecondPageClass] = useState();
    const [savedManu, setSavedManu] = useState(false);
    const [savedManuId, setSavedManuId] = useState();
    const handleFirstPage = () => {
        setFirstPageClass("active_hover-class");
        setSecondPageClass();
    };
    const handleSecondPage = () => {
        setFirstPageClass();
        setSecondPageClass("active_hover-class");
    };
    const navigate = useNavigate();
    const handleSaveManufacturer = async () => {
        console.log("check props All data menu action===>",props)
        if (props.company !=null && props.company.trim() !== "" && props.email !==null && props.email.trim() !== "") {
            props.AllDataManuAction(
                props.company,
                props.tag,
                props.contact,
                props.phone,
                props.phone_ext,
                props.phone_other_1,
                props.phone_other_2,
                props.phone_other_3,
                props.fax,
                props.toll_free,
                props.toll_free_ext,
                props.cell,
                props.home_phone,
                props.department,
                props.address,
                props.address_line_2,
                props.address_line_3,
                props.city,
                props.province,
                props.country,
                props.postal_code,
                props.email,
                props.email_other_1,
                props.email_other_2,
                props.email_other_3,
                props.email_other_4,
                props.email_other_5,
                props.website,
                props.shipping_acc,
                props.notes,
                props.created_on,
                false,
                false
            );
            if (props.manuPageOn === "edit") {
                try {
                    const data = {
                        manufacturer_id: props.manu_id,
                        company: props.company,
                        tag: props.tag,
                        contact: props.contact,
                        phone: props.phone,
                        phone_ext: props.phone_ext,
                        phone_other_1: props.phone_other_1,
                        phone_other_2: props.phone_other_2,
                        phone_other_3: props.phone_other_3,
                        fax: props.fax,
                        toll_free: props.toll_free,
                        toll_free_ext: props.toll_free_ext,
                        cell: props.cell,
                        home_phone: props.home_phone,
                        department: props.department,
                        address: props.address,
                        address_line_2: props.address_line_2,
                        address_line_3: props.address_line_3,
                        city: props.city,
                        province: props.province,
                        country: props.country,
                        postal_code: props.postal_code,
                        email: props.email,
                        email_other_1: props.email_other_1,
                        email_other_2: props.email_other_2,
                        email_other_3: props.email_other_3,
                        email_other_4: props.email_other_4,
                        email_other_5: props.email_other_5,
                        website: props.website,
                        shipping_acc: props.shipping_acc,
                        notes: props.notes,
                    };
                    const result = await UpdateManufacturer(data);
                    if (result) {
                        navigate("/manufacturer/home");
                        setSavedManu(false);
                        props.ManuPageOnAction("home");
                        props.EditManuDataAction("");
                        props.AllDataManuAction("","","","","","","","","","","","","","","","","","","","","","","","","","","","","","");
                    }
                } catch (e) { }
            } else {
                try {
                    const data = {
                        company: props.company,
                        tag: props.tag,
                        contact: props.contact,
                        phone: props.phone,
                        phone_ext: props.phone_ext,
                        phone_other_1: props.phone_other_1,
                        phone_other_2: props.phone_other_2,
                        phone_other_3: props.phone_other_3,
                        fax: props.fax,
                        toll_free: props.toll_free,
                        toll_free_ext: props.toll_free_ext,
                        cell: props.cell,
                        home_phone: props.home_phone,
                        department: props.department,
                        address: props.address,
                        address_line_2: props.address_line_2,
                        address_line_3: props.address_line_3,
                        city: props.city,
                        province: props.province,
                        country: props.country,
                        postal_code: props.postal_code,
                        email: props.email,
                        email_other_1: props.email_other_1,
                        email_other_2: props.email_other_2,
                        email_other_3: props.email_other_3,
                        email_other_4: props.email_other_4,
                        email_other_5: props.email_other_5,
                        website: props.website,
                        shipping_acc: props.shipping_acc,
                        notes: props.notes,
                    };
                    const result = await CreateManufacturer(data);
                    if (result) {
                        navigate("/manufacturer/home");
                        setSavedManu(false);
                        props.ManuPageOnAction("home");
                        props.EditManuDataAction("");
                        props.AllDataManuAction("","","","","","","","","","","","","","","","","","","","","","","","","","","","","","");
                    }
                } catch (e) { }
            }
        } else {
            if(props.company !== "" && props.email == ""){
                props.AllDataManuAction(
                    props.company,
                    props.tag,
                    props.contact,
                    props.phone,
                    props.phone_ext,
                    props.phone_other_1,
                    props.phone_other_2,
                    props.phone_other_3,
                    props.fax,
                    props.toll_free,
                    props.toll_free_ext,
                    props.cell,
                    props.home_phone,
                    props.department,
                    props.address,
                    props.address_line_2,
                    props.address_line_3,
                    props.city,
                    props.province,
                    props.country,
                    props.postal_code,
                    props.email,
                    props.email_other_1,
                    props.email_other_2,
                    props.email_other_3,
                    props.email_other_4,
                    props.email_other_5,
                    props.website,
                    props.shipping_acc,
                    props.notes,
                    props.created_on,
                    false,
                    true
                );
            }
            if(props.company == "" && props.email !== ""){
                props.AllDataManuAction(
                    props.company,
                    props.tag,
                    props.contact,
                    props.phone,
                    props.phone_ext,
                    props.phone_other_1,
                    props.phone_other_2,
                    props.phone_other_3,
                    props.fax,
                    props.toll_free,
                    props.toll_free_ext,
                    props.cell,
                    props.home_phone,
                    props.department,
                    props.address,
                    props.address_line_2,
                    props.address_line_3,
                    props.city,
                    props.province,
                    props.country,
                    props.postal_code,
                    props.email,
                    props.email_other_1,
                    props.email_other_2,
                    props.email_other_3,
                    props.email_other_4,
                    props.email_other_5,
                    props.website,
                    props.shipping_acc,
                    props.notes,
                    props.created_on,
                    true,
                    false
                );
            }
            if(props.company == "" && props.email == ""){
                props.AllDataManuAction(
                    props.company,
                    props.tag,
                    props.contact,
                    props.phone,
                    props.phone_ext,
                    props.phone_other_1,
                    props.phone_other_2,
                    props.phone_other_3,
                    props.fax,
                    props.toll_free,
                    props.toll_free_ext,
                    props.cell,
                    props.home_phone,
                    props.department,
                    props.address,
                    props.address_line_2,
                    props.address_line_3,
                    props.city,
                    props.province,
                    props.country,
                    props.postal_code,
                    props.email,
                    props.email_other_1,
                    props.email_other_2,
                    props.email_other_3,
                    props.email_other_4,
                    props.email_other_5,
                    props.website,
                    props.shipping_acc,
                    props.notes,
                    props.created_on,
                    true,
                    true
                );
            }
           
        }
    };
    const handleSaveContinueEdit = async () => {
        if (props.company.trim() !== "" && props.email.trim() !== "") {
            props.AllDataManuAction(
                props.company,
                props.tag,
                props.contact,
                props.phone,
                props.phone_ext,
                props.phone_other_1,
                props.phone_other_2,
                props.phone_other_3,
                props.fax,
                props.toll_free,
                props.toll_free_ext,
                props.cell,
                props.home_phone,
                props.department,
                props.address,
                props.address_line_2,
                props.address_line_3,
                props.city,
                props.province,
                props.country,
                props.postal_code,
                props.email,
                props.email_other_1,
                props.email_other_2,
                props.email_other_3,
                props.email_other_4,
                props.email_other_5,
                props.website,
                props.shipping_acc,
                props.notes,
                props.created_on,
                false
            );
            if (props.manuPageOn === "edit") {
                try {
                    const data = {
                        manufacturer_id: props.manu_id,
                        company: props.company,
                        tag: props.tag,
                        contact: props.contact,
                        phone: props.phone,
                        phone_ext: props.phone_ext,
                        phone_other_1: props.phone_other_1,
                        phone_other_2: props.phone_other_2,
                        phone_other_3: props.phone_other_3,
                        fax: props.fax,
                        toll_free: props.toll_free,
                        toll_free_ext: props.toll_free_ext,
                        cell: props.cell,
                        home_phone: props.home_phone,
                        department: props.department,
                        address: props.address,
                        address_line_2: props.address_line_2,
                        address_line_3: props.address_line_3,
                        city: props.city,
                        province: props.province,
                        country: props.country,
                        postal_code: props.postal_code,
                        email: props.email,
                        email_other_1: props.email_other_1,
                        email_other_2: props.email_other_2,
                        email_other_3: props.email_other_3,
                        email_other_4: props.email_other_4,
                        email_other_5: props.email_other_5,
                        website: props.website,
                        shipping_acc: props.shipping_acc,
                        notes: props.notes,
                    };
                    const result = await UpdateManufacturer(data);
                    if (result) {
                        navigate("/manufacturer/pagerouters");
                    }
                } catch (e) { }
            } else {
                if (savedManu === false) {
                    try {
                        const data = {
                            company: props.company,
                            tag: props.tag,
                            contact: props.contact,
                            phone: props.phone,
                            phone_ext: props.phone_ext,
                            phone_other_1: props.phone_other_1,
                            phone_other_2: props.phone_other_2,
                            phone_other_3: props.phone_other_3,
                            fax: props.fax,
                            toll_free: props.toll_free,
                            toll_free_ext: props.toll_free_ext,
                            cell: props.cell,
                            home_phone: props.home_phone,
                            department: props.department,
                            address: props.address,
                            address_line_2: props.address_line_2,
                            address_line_3: props.address_line_3,
                            city: props.city,
                            province: props.province,
                            country: props.country,
                            postal_code: props.postal_code,
                            email: props.email,
                            email_other_1: props.email_other_1,
                            email_other_2: props.email_other_2,
                            email_other_3: props.email_other_3,
                            email_other_4: props.email_other_4,
                            email_other_5: props.email_other_5,
                            website: props.website,
                            shipping_acc: props.shipping_acc,
                            notes: props.notes,
                        };
                        const result = await CreateManufacturer(data);
                        if (result) {
                            navigate("/manufacturer/pagerouters");
                            setSavedManu(true);
                            setSavedManuId(result.data.id);
                        }
                    } catch (e) { }
                } else {
                    try {
                        const data = {
                            manufacturer_id: savedManuId,
                            company: props.company,
                            tag: props.tag,
                            contact: props.contact,
                            phone: props.phone,
                            phone_ext: props.phone_ext,
                            phone_other_1: props.phone_other_1,
                            phone_other_2: props.phone_other_2,
                            phone_other_3: props.phone_other_3,
                            fax: props.fax,
                            toll_free: props.toll_free,
                            toll_free_ext: props.toll_free_ext,
                            cell: props.cell,
                            home_phone: props.home_phone,
                            department: props.department,
                            address: props.address,
                            address_line_2: props.address_line_2,
                            address_line_3: props.address_line_3,
                            city: props.city,
                            province: props.province,
                            country: props.country,
                            postal_code: props.postal_code,
                            email: props.email,
                            email_other_1: props.email_other_1,
                            email_other_2: props.email_other_2,
                            email_other_3: props.email_other_3,
                            email_other_4: props.email_other_4,
                            email_other_5: props.email_other_5,
                            website: props.website,
                            shipping_acc: props.shipping_acc,
                            notes: props.notes,
                        };
                        const result = await UpdateManufacturer(data);
                        if (result) {
                            navigate("/manufacturer/pagerouters");
                        }
                    } catch (e) { }
                }
            }
        } else {
            if(props.company.trim() !== "" && props.email.trim() == ""){
                props.AllDataManuAction(
                    props.company,
                    props.tag,
                    props.contact,
                    props.phone,
                    props.phone_ext,
                    props.phone_other_1,
                    props.phone_other_2,
                    props.phone_other_3,
                    props.fax,
                    props.toll_free,
                    props.toll_free_ext,
                    props.cell,
                    props.home_phone,
                    props.department,
                    props.address,
                    props.address_line_2,
                    props.address_line_3,
                    props.city,
                    props.province,
                    props.country,
                    props.postal_code,
                    props.email,
                    props.email_other_1,
                    props.email_other_2,
                    props.email_other_3,
                    props.email_other_4,
                    props.email_other_5,
                    props.website,
                    props.shipping_acc,
                    props.notes,
                    props.created_on,
                    false,
                    true
                );
            }
            if(props.company.trim() == "" && props.email.trim() !== ""){
                props.AllDataManuAction(
                    props.company,
                    props.tag,
                    props.contact,
                    props.phone,
                    props.phone_ext,
                    props.phone_other_1,
                    props.phone_other_2,
                    props.phone_other_3,
                    props.fax,
                    props.toll_free,
                    props.toll_free_ext,
                    props.cell,
                    props.home_phone,
                    props.department,
                    props.address,
                    props.address_line_2,
                    props.address_line_3,
                    props.city,
                    props.province,
                    props.country,
                    props.postal_code,
                    props.email,
                    props.email_other_1,
                    props.email_other_2,
                    props.email_other_3,
                    props.email_other_4,
                    props.email_other_5,
                    props.website,
                    props.shipping_acc,
                    props.notes,
                    props.created_on,
                    true,
                    false
                );
            }
            if(props.company.trim() == "" && props.email.trim() == ""){
                props.AllDataManuAction(
                    props.company,
                    props.tag,
                    props.contact,
                    props.phone,
                    props.phone_ext,
                    props.phone_other_1,
                    props.phone_other_2,
                    props.phone_other_3,
                    props.fax,
                    props.toll_free,
                    props.toll_free_ext,
                    props.cell,
                    props.home_phone,
                    props.department,
                    props.address,
                    props.address_line_2,
                    props.address_line_3,
                    props.city,
                    props.province,
                    props.country,
                    props.postal_code,
                    props.email,
                    props.email_other_1,
                    props.email_other_2,
                    props.email_other_3,
                    props.email_other_4,
                    props.email_other_5,
                    props.website,
                    props.shipping_acc,
                    props.notes,
                    props.created_on,
                    true,
                    true
                );
            }
        }
    };
    const handleDeleteManufacturer = async () => {
        try {
            const data = {
                manufacturer_id: props.manu_id,
            };
            const result = await DeleteManufacturer(data);
            if (result) {
                navigate("/manufacturer/home");
                props.ManuPageOnAction("home");
                props.EditManuDataAction("");
            }
        } catch (e) { }
    };
    return (
        <div className="tab-wrapper">
            <div className="add_special_order bg-white">
                <div className="link-wrapper">
                    <div onClick={() => {
                        props.AllDataManuAction("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
                        props.EditManuDataAction("");
                        props.ManuPageOnAction("home");
                        props.AttachmentsManuAction("", "");
                        navigate("/manufacturer/home");
                    }}>
                        <h2>
                            <Icon source={MobileBackArrowMajor} color="base" />
                            Back
                        </h2>
                    </div>
                    {/* {props.manuPageOn === "edit" && (<h2 onClick={handleDeleteManufacturer}>Delete Manufacturer</h2>)} */}
                    <h2 onClick={() => props.AllDataManuAction("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")}>Reset</h2>
                    <h2 onClick={handleSaveContinueEdit}>Save and Continue Edit</h2>
                    <Button onClick={handleSaveManufacturer}>Save Manufacturer</Button>
                </div>
                <div className="order-wrapping">
                    <div className="order-tabs_all">
                        <div className="order-tab_wrap">
                            <ul>
                                <h1>Information</h1>
                                <Link to="/manufacturer/pagerouters">
                                    <li
                                        className={firstPageClass}
                                        onClick={handleFirstPage}
                                    >
                                        Manufacturer Details
                                    </li>
                                </Link>
                                <Link to="/manufacturer/pagerouters/attachments">
                                    <li
                                        className={secondPageClass}
                                        onClick={handleSecondPage}
                                    >
                                        Attachments
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="order-within_wrap">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        company: state.company,
        tag: state.tag,
        contact: state.contact,
        phone: state.phone,
        phone_ext: state.phone_ext,
        phone_other_1: state.phone_other_1,
        phone_other_2: state.phone_other_2,
        phone_other_3: state.phone_other_3,
        fax: state.fax,
        toll_free: state.toll_free,
        toll_free_ext: state.toll_free_ext,
        cell: state.cell,
        home_phone: state.home_phone,
        department: state.department,
        address: state.address,
        address_line_2: state.address_line_2,
        address_line_3: state.address_line_3,
        city: state.city,
        province: state.province,
        country: state.country,
        postal_code: state.postal_code,
        email: state.email,
        email_other_1: state.email_other_1,
        email_other_2: state.email_other_2,
        email_other_3: state.email_other_3,
        email_other_4: state.email_other_4,
        email_other_5: state.email_other_5,
        website: state.website,
        shipping_acc: state.shipping_acc,
        notes: state.notes,
        created_on: state.created_on,
        manu_id: state.manu_id,
        manuPageOn: state.manuPageOn
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        AllDataManuAction: (
            company,
            tag,
            contact,
            phone,
            phone_ext,
            phone_other_1,
            phone_other_2,
            phone_other_3,
            fax,
            toll_free,
            toll_free_ext,
            cell,
            home_phone,
            department,
            address,
            address_line_2,
            address_line_3,
            city,
            province,
            country,
            postal_code,
            email,
            email_other_1,
            email_other_2,
            email_other_3,
            email_other_4,
            email_other_5,
            website,
            shipping_acc,
            notes,
            created_on,
            company_err,
            email_err) => dispatch(AllDataManuAction(
                company,
                tag,
                contact,
                phone,
                phone_ext,
                phone_other_1,
                phone_other_2,
                phone_other_3,
                fax,
                toll_free,
                toll_free_ext,
                cell,
                home_phone,
                department,
                address,
                address_line_2,
                address_line_3,
                city,
                province,
                country,
                postal_code,
                email,
                email_other_1,
                email_other_2,
                email_other_3,
                email_other_4,
                email_other_5,
                website,
                shipping_acc,
                notes,
                created_on,
                company_err,
                email_err)),
        EditManuDataAction: (manu_id) => (dispatch(EditManuDataAction(manu_id))),
        ManuPageOnAction: (manuPageOn) => (dispatch(ManuPageOnAction(manuPageOn))),
        AttachmentsManuAction: (attachments, attachments_notes) => dispatch(AttachmentsManuAction(attachments, attachments_notes))
    };
};

/*-------ManufacturerPageLayout function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerPageLayout);
