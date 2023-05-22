import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Card, TextField, Button, Icon } from "@shopify/polaris";
import { ChevronLeftMinor, ChevronRightMinor, ArrowUpMinor, ArrowDownMinor } from '@shopify/polaris-icons';
import { connect } from "react-redux";
import { AllDataManuAction, EditManuDataAction, ViewSpclOrdersAction, ManuPageOnAction } from "../Redux";
import { ManufacturerDetailPaginationService, DeleteManufacturer } from "../Services";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

/*------------This function contains functionality of export, reset filters, items per page and pagination----------*/
export const ManufacturerHome = (props) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState();
  const [manufacturers, setManufacturers] = useState([]);
  const [manuCompany, setManuCompany] = useState();
  const [manuTag, setManuTag] = useState();
  const [manuPhone, setManuPhone] = useState();
  const [sort, setSort] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchField, setSearchField] = useState("");
  const [searchData, setSearchData] = useState("");
  const [exportType, setExportType] = useState("csv");
  const navigate = useNavigate();
  const location = useLocation();
  const handlePageChange = async () => {
    try {
      const result = await ManufacturerDetailPaginationService(itemsPerPage, sort, sortOrder, searchField, searchData, currentPage);
      setData(result.data);
      setManufacturers(result.data.data);
    } catch { }
  };
  useEffect(() => {
    handlePageChange();
  }, [currentPage, location.key]);
  const handleManufacturerCompany = async (type, e) => {
    setManuCompany(e);
    setManuTag();
    setManuPhone();
    const result = await ManufacturerDetailPaginationService(itemsPerPage, sort, sortOrder, type, e, currentPage);
    setData(result.data);
    setManufacturers(result.data.data);
    setSearchField(type);
    setSearchData(e);
  };
  const handleManufacturerTag = async (type, e) => {
    setManuTag(e);
    setManuCompany();
    setManuPhone();
    const result = await ManufacturerDetailPaginationService(itemsPerPage, sort, sortOrder, type, e, currentPage);
    setData(result.data);
    setManufacturers(result.data.data);
    setSearchField(type);
    setSearchData(e);
  };
  const handleManufacturerPhone = async (type, e) => {
    setManuPhone(e);
    setManuTag();
    setManuCompany();
    const result = await ManufacturerDetailPaginationService(itemsPerPage, sort, sortOrder, type, e, currentPage);
    setData(result.data);
    setManufacturers(result.data.data);
    setSearchField(type);
    setSearchData(e);
  };
  const handleDeleteManufacturer = async (id) => {
    try {
      const data = {
        manufacturer_id: id,
      };
      const result = await DeleteManufacturer(data);
      if (result) {
        navigate("/manufacturer/home");
      }
    } catch (e) { }
  };
  const rowMarkup = manufacturers && manufacturers.map((manufacturer) => (
    <tr key={manufacturer.id}>
      <td>{manufacturer.id}</td>
      <td>{manufacturer.company}</td>
      <td>{manufacturer.tag}</td>
      <td>{manufacturer.phone}</td>
      <td></td>
      <td></td>
      <td></td>
      <td><a href="#" onClick={() => {
        props.AllDataManuAction(
          manufacturer.company,
          manufacturer.tag,
          manufacturer.contact,
          manufacturer.phone,
          manufacturer.phone_ext,
          manufacturer.phone_other_1,
          manufacturer.phone_other_2,
          manufacturer.phone_other_3,
          manufacturer.fax,
          manufacturer.toll_free,
          manufacturer.toll_free_ext,
          manufacturer.cell,
          manufacturer.home_phone,
          manufacturer.department,
          manufacturer.address,
          manufacturer.address_line_2,
          manufacturer.address_line_3,
          manufacturer.city,
          manufacturer.province,
          manufacturer.country,
          manufacturer.postal_code,
          manufacturer.email,
          manufacturer.email_other_1,
          manufacturer.email_other_2,
          manufacturer.email_other_3,
          manufacturer.email_other_4,
          manufacturer.email_other_5,
          manufacturer.website,
          manufacturer.shipping_acc,
          manufacturer.notes,
          manufacturer.created_on,
          manufacturer.company_err);
        props.ManuPageOnAction("edit");
        props.EditManuDataAction(manufacturer.id);
        navigate("/manufacturer/pagerouters");
      }}>Edit</a></td>
      {/* <td><a href="#" onClick={() => handleDeleteManufacturer(manufacturer.id)}>Delete</a></td> */}
      <td><a href="#" onClick={() => { props.ViewSpclOrdersAction(true, manufacturer.company); navigate("/"); }}>View Special Orders</a></td>
    </tr>
  ));
  const handleSort = async (e) => {
    let show = sortOrder;
    let index = show.indexOf('asc');
    if (index != -1) {
      show = 'desc';
    } else {
      show = 'asc';
    }
    const result = await ManufacturerDetailPaginationService(itemsPerPage, e.target.attributes[0].value, show, searchField, searchData, currentPage);
    setData(result.data);
    setManufacturers(result.data.data);
    setSort(e.target.attributes[0].value);
    setSortOrder(show);
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
  const handleExport = async () => {
    const headers = { 'Content-Type': 'blob' };
    const config = { method: 'GET', url: window.location.origin + '/api/getAllManufacturers', responseType: 'arraybuffer', headers };
    try {
      const response = await axios(config);
      const outputFilename = `${Date.now()}.${exportType}`;
      // If you want to download file automatically using link attribute.
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', outputFilename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      throw Error(error);
    }
  };
  // const handleSearch = () => {
  //   if (manuCompany) {
  //     handleManufacturerCompany();
  //   } else if (manuTag) {
  //     handleManufacturerTag();
  //   } else {
  //     handleManufacturerPhone();
  //   }
  // }
  return (
    <div className="tab-wrapper">
      <Card>
        <div className="add_special_order spc-order_wrap">
          <Button onClick={() => { props.ManuPageOnAction("add"); navigate("/manufacturer/pagerouters"); }}>Add Manufacturer</Button>
        </div>
        <div className="soryby-wrap export-wrap">
          <h1>Export to:</h1>
          <div className="cust-select select">
            <select onChange={(e) => setExportType(e.target.value)} value={exportType} name="format" id="format">
              <option value="csv">CSV</option>
              <option value="xml">Excel XML</option>
            </select>
          </div>
          <Button onClick={handleExport}>Export</Button>
        </div>
        <div className="shorting-wrap home-wrap manu-wrap-whole">
          <div className="short-status-wrap manu-short-wrap">
            {/* <div className="shorting-left">
              <div className="select_drop">
                <div className="search-manu-btn">
                  <Button onClick={handleSearch}>Search</Button>
                </div>
              </div>
            </div> */}
            <div className="manu-reset">
              <a onClick={() => {
                setSort("id");
                setSortOrder("asc");
                setSearchField("");
                setSearchData("");
                setManuPhone();
                setManuTag();
                setManuCompany();
                navigate("/manufacturer/home");
              }}>Reset Filter</a>
            </div>
          </div>
          <p className="admin__control-support-text">
            {data && data.total} records found
          </p>
          <div className="sorting-right">
            <div className="soryby-wrap">
              <div className="cust-select select">
                <select onChange={(e) => setItemsPerPage(e.target.value)} value={itemsPerPage} name="format" id="format">
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
        </div>
      </Card>
      <div>
        <Card>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="id" data_sort="desc">Id</p>{arrowMove}</div></th>
                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="company" data_sort="desc">Company</p>{arrowMove}</div></th>
                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="tag" data_sort="desc">Tag</p>{arrowMove}</div></th>
                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="phone" data_sort="desc">Phone</p>{arrowMove}</div></th>
                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="colour" data_sort="desc">Pending Downtown</p>{arrowMove}</div></th>
                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="size" data_sort="desc">Pending Uptown</p>{arrowMove}</div></th>
                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="customer" data_sort="desc">Pending Warehouse</p>{arrowMove}</div></th>
                <th scope="col">Edit</th>
                {/* <th scope="col">Delete</th> */}
                <th scope="col">Special Orders</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>
                </td> */}
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {rowMarkup}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

/*-----------Redux states------------------*/
const mapStateToProps = (state) => ({
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
  created_on: state.created_on
});

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
        company_err)),
    EditManuDataAction: (manu_id) => (dispatch(EditManuDataAction(manu_id))),
    ViewSpclOrdersAction: (view_spcl_orders, view_spcl_orders_manu) => (dispatch(ViewSpclOrdersAction(view_spcl_orders, view_spcl_orders_manu))),
    ManuPageOnAction: (manuPageOn) => (dispatch(ManuPageOnAction(manuPageOn)))
  };
};

/*-------ManufacturerHome function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerHome);