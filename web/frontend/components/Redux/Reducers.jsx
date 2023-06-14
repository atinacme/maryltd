import { ALL_CHECKED_DATA, ALL_DATA, ALL_DATA_MANU, ATTACHMENTS_MANU, CUSTOMER_COMPANY, CUSTOMER_DATA, CUSTOMER_DETAIL_VIEW, DASHBOARD_TAB, EDIT_DATA_MANU, EDIT_NEW_TASK, EDIT_ORDER_DATA, EMAILTOSUPPLIER, ERROR_MSG, MANUFACTURER_DATA, MANUFACTURER_DETAIL_VIEW, MANUFACTURER_PAGE_DATA, MANU_PAGE_ON, NEW_SPCL_DATA, NEW_TASK_DATA, NEW_TASK_ERROR_MSG, NEW_TASK_PAGE_ON, ORDER_PAGE_ON, PRODUCT_DATA, SELECTED_CUSTOMER, SPCL_DATA, SPCL_ORDER_DETAILS_CHK, USER_AUTH, VIEW_SPCL_ORDERS } from "./Types";

const initialState = {
    user_auth: false,
    shop: "",
    shop_owner: "",
    staff_member_logged_in: "",
    dashboard_tab: 1,
    customer: "",
    click: false,
    src: "",
    clickCustomer: false,
    cust_company: "",
    clickProductImage: false,
    manufacturer: "",
    manuClick: false,
    allPageData: "",
    sort: "id",
    sortOrder: "desc",
    allPageChecked: [],
    searchField: "",
    searchData: "",
    currentPage: 1,
    itemsPerPage: 2,
    cusPageData: "",
    cusSort: "id",
    cusSortOrder: "desc",
    cusSearchField: "",
    cusSearchData: "",
    cusCurrentPage: 1,
    cusItemsPerPage: 2,
    manuPageData: "",
    manuSort: "id",
    manuSortOrder: "desc",
    manuSearchField: "",
    manuSearchData: "",
    manuCurrentPage: 1,
    manuItemsPerPage: 2,
    status: "not_sent",
    stock: "",
    quantity: "",
    karat: "",
    colour: "",
    size: "",
    desc: "",
    cust_notes: "",
    stock_err: false,
    quantity_err: false,
    karat_err: false,
    colour_err: false,
    size_err: false,
    desc_err: false,
    customer_err: false,
    manufacturer_err: false,
    scanned_copy: [],
    order_create: false,
    spcl_order_details_array_checker: [],
    order_id: "",
    company: "",
    tag: "",
    contact: "",
    phone: "",
    phone_ext: "",
    phone_other_1: "",
    phone_other_2: "",
    phone_other_3: "",
    fax: "",
    toll_free: "",
    toll_free_ext: "",
    cell: "",
    home_phone: "",
    department: "",
    address: "",
    address_line_2: "",
    address_line_3: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
    email: "",
    email_other_1: "",
    email_other_2: "",
    email_other_3: "",
    email_other_4: "",
    email_other_5: "",
    website: "",
    shipping_acc: "",
    notes: "",
    created_on: "",
    company_err: false,
    email_err: false,
    attachments: "",
    attachments_notes: "",
    manu_id: "",
    view_spcl_orders: false,
    view_spcl_orders_manu: "",
    manuPageOn: "home",
    orderPageOn: "home",
    cust_detail_view: false,
    cust_detail_view_customer: "",
    manu_detail_view: false,
    manu_detail_view_manufacturer: "",
    email_to_supplier: false,
    new_task_status: "Pending",
    new_task_company: "",
    new_task_order_placed_by: "",
    new_task_order_type: "North",
    new_task_shipping_method: "",
    new_task_ship_date: "",
    new_task_order_details: "",
    new_task_internal_notes: "",
    new_task_attachments: "",
    new_task_attachments_array: [],
    new_task_created_at: "",
    new_task_company_err: false,
    new_task_order_placed_by_err: false,
    new_task_order_details_err: false,
    newTaskPageOn: "home",
    new_task_id: ""
};

const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTH:
            return {
                ...state,
                user_auth: action.user_auth,
                shop: action.shop,
                shop_owner: action.shop_owner,
                staff_member_logged_in: action.staff_member_logged_in
            };
        case DASHBOARD_TAB:
            return {
                ...state,
                dashboard_tab: action.dashboard_tab
            };
        case SELECTED_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
                click: action.clicked,
                clickCustomer: action.click
            };
        case PRODUCT_DATA:
            return {
                ...state,
                src: action.src,
                clickProductImage: action.click
            };
        case MANUFACTURER_DATA:
            return {
                ...state,
                manufacturer: action.name,
                manuClick: action.click
            };
        case ALL_DATA:
            return {
                ...state,
                allPageData: action.data,
                sort: action.sort,
                sortOrder: action.order,
                searchField: action.searchOn,
                searchData: action.search,
                currentPage: action.page,
                itemsPerPage: action.item
            };
        case ALL_CHECKED_DATA:
            return {
                ...state,
                allPageChecked: action.checked
            };
        case CUSTOMER_DATA:
            return {
                ...state,
                cusPageData: action.data,
                cusSort: action.sort,
                cusSortOrder: action.order,
                cusSearchField: action.searchOn,
                cusSearchData: action.search,
                cusCurrentPage: action.page,
                cusItemsPerPage: action.item
            };
        case MANUFACTURER_PAGE_DATA:
            return {
                ...state,
                manuPageData: action.data,
                manuSort: action.sort,
                manuSortOrder: action.order,
                manuSearchField: action.searchOn,
                manuSearchData: action.search,
                manuCurrentPage: action.page,
                manuItemsPerPage: action.item
            };
        case SPCL_DATA:
            return {
                ...state,
                status: action.status,
                stock: action.stock,
                quantity: action.quantity,
                karat: action.karat,
                colour: action.colour,
                size: action.size,
                desc: action.desc,
                cust_notes: action.cust_notes,
                scanned_copy: action.scanned_copy
            };
        case NEW_SPCL_DATA:
            return {
                ...state,
                order_create: action.order_create
            };
        case SPCL_ORDER_DETAILS_CHK:
            return {
                ...state,
                spcl_order_details_array_checker: action.spcl_order_details_array_checker
            }
        case ERROR_MSG:
            return {
                ...state,
                stock_err: action.stock_err,
                quantity_err: action.quantity_err,
                karat_err: action.karat_err,
                colour_err: action.colour_err,
                size_err: action.size_err,
                desc_err: action.desc_err,
                customer_err: action.customer_err,
                manufacturer_err: action.manufacturer_err
            };
        case EDIT_ORDER_DATA:
            return {
                ...state,
                order_id: action.order_id
            };
        case ALL_DATA_MANU:
            return {
                ...state,
                company: action.company,
                tag: action.tag,
                contact: action.contact,
                phone: action.phone,
                phone_ext: action.phone_ext,
                phone_other_1: action.phone_other_1,
                phone_other_2: action.phone_other_2,
                phone_other_3: action.phone_other_3,
                fax: action.fax,
                toll_free: action.toll_free,
                toll_free_ext: action.toll_free_ext,
                cell: action.cell,
                home_phone: action.home_phone,
                department: action.department,
                address: action.address,
                address_line_2: action.address_line_2,
                address_line_3: action.address_line_3,
                city: action.city,
                province: action.province,
                country: action.country,
                postal_code: action.postal_code,
                email: action.email,
                email_other_1: action.email_other_1,
                email_other_2: action.email_other_2,
                email_other_3: action.email_other_3,
                email_other_4: action.email_other_4,
                email_other_5: action.email_other_5,
                website: action.website,
                shipping_acc: action.shipping_acc,
                notes: action.notes,
                created_on: action.created_on,
                company_err: action.company_err,
                email_err: action.email_err
            };
        case ATTACHMENTS_MANU:
            return {
                ...state,
                attachments: action.attachments,
                attachments_notes: action.attachments_notes
            };
        case EDIT_DATA_MANU:
            return {
                ...state,
                manu_id: action.manu_id
            };
        case VIEW_SPCL_ORDERS:
            return {
                ...state,
                view_spcl_orders: action.view_spcl_orders,
                view_spcl_orders_manu: action.view_spcl_orders_manu
            };
        case MANU_PAGE_ON:
            return {
                ...state,
                manuPageOn: action.manuPageOn
            };
        case ORDER_PAGE_ON:
            return {
                ...state,
                orderPageOn: action.orderPageOn
            };
        case CUSTOMER_DETAIL_VIEW:
            return {
                ...state,
                cust_detail_view: action.cust_detail_view,
                cust_detail_view_customer: action.cust_detail_view_customer
            };
        case MANUFACTURER_DETAIL_VIEW:
            return {
                ...state,
                manu_detail_view: action.manu_detail_view,
                manu_detail_view_manufacturer: action.manu_detail_view_manufacturer
            };
        case CUSTOMER_COMPANY:
            return {
                ...state,
                cust_company: action.cust_company
            };
        case EMAILTOSUPPLIER:
            return {
                ...state,
                email_to_supplier: action.email_to_supplier
            };
        case NEW_TASK_DATA:
            return {
                ...state,
                new_task_status: action.new_task_status,
                new_task_company: action.new_task_company,
                new_task_order_placed_by: action.new_task_order_placed_by,
                new_task_order_type: action.new_task_order_type,
                new_task_shipping_method: action.new_task_shipping_method,
                new_task_ship_date: action.new_task_ship_date,
                new_task_order_details: action.new_task_order_details,
                new_task_internal_notes: action.new_task_internal_notes,
                new_task_attachments: action.new_task_attachments,
                new_task_attachments_array: action.new_task_attachments_array,
                new_task_created_at: action.new_task_created_at
            };
        case NEW_TASK_ERROR_MSG:
            return {
                ...state,
                new_task_company_err: action.new_task_company_err,
                new_task_order_placed_by_err: action.new_task_order_placed_by_err,
                new_task_order_details_err: action.new_task_order_details_err
            };
        case NEW_TASK_PAGE_ON:
            return {
                ...state,
                newTaskPageOn: action.newTaskPageOn
            };
        case EDIT_NEW_TASK:
            return {
                ...state,
                new_task_id: action.new_task_id
            };
        default:
            return state;
    }
};

export  { Reducers,initialState };