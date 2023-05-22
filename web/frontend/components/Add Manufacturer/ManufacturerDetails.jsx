import React from "react";
import { FormLayout } from "@shopify/polaris";
import { connect } from "react-redux";
import { AllDataManuAction } from "../Redux";

/*------------This function has all the first tab form fields of add manufacturer----------*/
function ManufacturerDetails(props) {
    const errorMsg = "This is a required field."
    return (
        <div>
            <h2 className="main-heading">Manufacturer</h2>
            <div className="spcl_order">
                <FormLayout>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Company</label>
                        <input
                            className="required_cls"
                            value={props.company}
                            onChange={(e) => props.AllDataManuAction(
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                        {props.company_err && <div>{errorMsg}</div>}
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Tag</label>
                        <input
                            value={props.tag}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Contact</label>
                        <input
                            value={props.contact}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Phone</label>
                        <input
                            value={props.phone}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                props.contact,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Phone Ext.</label>
                        <input
                            className="required_cls"
                            value={props.phone_ext}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                props.contact,
                                props.phone,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Phone Other 1</label>
                        <input
                            value={props.phone_other_1}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                props.contact,
                                props.phone,
                                props.phone_ext,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Phone Other 2</label>
                        <input
                            value={props.phone_other_2}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                props.contact,
                                props.phone,
                                props.phone_ext,
                                props.phone_other_1,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Phone Other 3</label>
                        <input
                            className="required_cls"
                            value={props.phone_other_3}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                props.contact,
                                props.phone,
                                props.phone_ext,
                                props.phone_other_1,
                                props.phone_other_2,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Fax</label>
                        <input
                            className="required_cls"
                            value={props.fax}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                props.contact,
                                props.phone,
                                props.phone_ext,
                                props.phone_other_1,
                                props.phone_other_2,
                                props.phone_other_3,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Toll Free</label>
                        <input
                            className="required_cls"
                            value={props.toll_free}
                            onChange={(e) => props.AllDataManuAction(
                                props.company,
                                props.tag,
                                props.contact,
                                props.phone,
                                props.phone_ext,
                                props.phone_other_1,
                                props.phone_other_2,
                                props.phone_other_3,
                                props.fax,
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Toll Free Ext.</label>
                        <input
                            className="required_cls"
                            value={props.toll_free_ext}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Cell</label>
                        <input
                            className="required_cls"
                            value={props.cell}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Home Phone</label>
                        <input
                            className="required_cls"
                            value={props.home_phone}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Department</label>
                        <input
                            className="required_cls"
                            value={props.department}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Address</label>
                        <input
                            className="required_cls"
                            value={props.address}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Address Line 2</label>
                        <input
                            className="required_cls"
                            value={props.address_line_2}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Address Line 3</label>
                        <input
                            className="required_cls"
                            value={props.address_line_3}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>City</label>
                        <input
                            className="required_cls"
                            value={props.city}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Province</label>
                        <input
                            className="required_cls"
                            value={props.province}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Country</label>
                        <input
                            className="required_cls"
                            value={props.country}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Postal Code</label>
                        <input
                            className="required_cls"
                            value={props.postal_code}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
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
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Email</label>
                        <input
                            className="required_cls"
                            value={props.email}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.email_other_1,
                                props.email_other_2,
                                props.email_other_3,
                                props.email_other_4,
                                props.email_other_5,
                                props.website,
                                props.shipping_acc,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                        <a href="#" onClick={() => window.open(`mailto:${props.email}}`)}>Open Email</a>
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Email Other 1</label>
                        <input
                            className="required_cls"
                            value={props.email_other_1}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.email_other_2,
                                props.email_other_3,
                                props.email_other_4,
                                props.email_other_5,
                                props.website,
                                props.shipping_acc,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                        <a href="#" onClick={() => window.open(`mailto:${props.email_other_1}}`)}>Open Email</a>
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Email Other 2</label>
                        <input
                            className="required_cls"
                            value={props.email_other_2}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.email_other_3,
                                props.email_other_4,
                                props.email_other_5,
                                props.website,
                                props.shipping_acc,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                        <a href="#" onClick={() => window.open(`mailto:${props.email_other_2}}`)}>Open Email</a>
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Email Other 3</label>
                        <input
                            className="required_cls"
                            value={props.email_other_3}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.email_other_4,
                                props.email_other_5,
                                props.website,
                                props.shipping_acc,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                        <a href="#" onClick={() => window.open(`mailto:${props.email_other_3}}`)}>Open Email</a>
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Email Other 4</label>
                        <input
                            className="required_cls"
                            value={props.email_other_4}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.email_other_5,
                                props.website,
                                props.shipping_acc,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                        <a href="#" onClick={() => window.open(`mailto:${props.email_other_4}}`)}>Open Email</a>
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Email Other 5</label>
                        <input
                            className="required_cls"
                            value={props.email_other_5}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.website,
                                props.shipping_acc,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                        <a href="#" onClick={() => window.open(`mailto:${props.email_other_5}}`)}>Open Email</a>
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Website</label>
                        <input
                            className="required_cls"
                            value={props.website}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.shipping_acc,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                        <a rel="noopener noreferrer" href="#" target="_blank" onClick={() => window.open(`https://${props.website}`, '_blank')}>Open Website</a>
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Shipping Acc. #</label>
                        <input
                            className="required_cls"
                            value={props.shipping_acc}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.notes,
                                props.created_on,
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Notes</label>
                        <textarea rows="5"
                            value={props.notes}
                            onChange={(e) => props.AllDataManuAction(
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
                                e.target.value,
                                props.created_on,
                                props.company_err
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Created on</label>
                        <input className="created-disable"
                            disabled="disabled"
                        />
                    </div>
                </FormLayout>
            </div>
        </div>
    );
}

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
        company_err: state.company_err
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
            company_err) => dispatch(AllDataManuAction(
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
                company_err))
    };
};

/*-------ManufacturerDetails function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerDetails);
