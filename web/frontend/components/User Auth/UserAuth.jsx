import { Form, FormLayout, Button } from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { UserAuthAction } from "../Redux";
import { useNavigate } from "@shopify/app-bridge-react";
import { AddStaffMembersService, LoginStaffMembersService, UpdateStaffMemberPasswordService } from '../Services';
import { useAuthenticatedFetch } from "../../hooks";

/*---------------USer Authentication and Authorization, LogIn, SignUp and Forgot Passowrd--------------*/
function UserAuth(props) {
    const [auth, setAuth] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [passwordUpdate, setPasswordUpdate] = useState(false);
    const [activeClassLogIn, setActiveClassLogIn] = useState("form-tab active-form");
    const [activeClassSignUp, setActiveClassSignUp] = useState("form-tab");
    const [arrayCheckLogIn, setArrayCheckLogIn] = useState([]);
    const [arrayCheckSignUp, setArrayCheckSignUp] = useState([]);
    const [arrayCheckForgotPassword, setArrayCheckForgotPassword] = useState([]);
    const [shopData, setShopData] = useState();
    const navigate = useNavigate();
    const fetch = useAuthenticatedFetch();

    useEffect(() => {
        const getShopData = () => {
            fetch("/api/shop")
                .then((res) => res.json())
                .then((data) =>
                    setShopData(data.shop)
                );
        };
        getShopData();
        console.log("get shop data all===>", shopData);
    }, []);

    const handleNameChange = ((e) => setName(e.target.value));
    const handleEmailChange = ((e) => setEmail(e.target.value));
    const handlePasswordChange = ((e) => setPassword(e.target.value));
    const handleConfirmPasswordChange = ((e) => setConfirmPassword(e.target.value));

    let array_error_log_in = [];
    let array_checker_log_in = [false, false];

    const handleLogIn = async () => {
        document.querySelectorAll(".user_login_required_cls").forEach(itm => {
            if (itm.value == "") {
                array_error_log_in.push(itm.getAttribute("index"));
            }
        });
        array_error_log_in.forEach(item => {
            array_checker_log_in[item] = true;
            setArrayCheckLogIn(array_checker_log_in);
        });
        let checked_array = array_checker_log_in.every((item) => {
            return item == false;
        });
        if (checked_array === true) {
            try {
                const data = {
                    email: email,
                    password: password
                };
                const result = await LoginStaffMembersService(data);
                if (result.status === 200 && result.data.is_verified === 1) {
                    setEmail("");
                    setPassword("");
                    props.UserAuthAction(true, result.data.shop, result.data.shop_owner, result.data.staff_member);
                    localStorage.setItem("authenticated", true);
                    navigate("/");
                } else {
                    setLoginMessage(result.result);
                }
            } catch { }
        }
    };

    let array_error_sign_up = [];
    let array_checker_sign_up = [false, false, false, false];

    const handleSignUp = async () => {
        document.querySelectorAll(".user_signup_required_cls").forEach(itm => {
            if (itm.value == "") {
                array_error_sign_up.push(itm.getAttribute("index"));
            }
        });
        array_error_sign_up.forEach(item => {
            array_checker_sign_up[item] = true;
            setArrayCheckSignUp(array_checker_sign_up);
        });
        let checked_array = array_checker_sign_up.every((item) => {
            return item == false;
        });
        if (checked_array === true) {
            try {
                const data = {
                    shop: shopData ? shopData.domain : "",
                    shop_owner: shopData ? shopData.shop_owner : "",
                    staff_member: name,
                    email: email,
                    password: password
                };
                const result = await AddStaffMembersService(data);

                console.log("check customer data===>add new", result);
                if (result) {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setEmailSent(true);
                }
            } catch { }
        }
    };

    let array_error_forgot_password = [];
    let array_checker_forgot_password = [false, false, false];

    const handleForgotPassword = async () => {
        document.querySelectorAll(".user_forgot_password_required_cls").forEach(itm => {
            if (itm.value == "") {
                array_error_forgot_password.push(itm.getAttribute("index"));
            }
        });
        array_error_forgot_password.forEach(item => {
            array_checker_forgot_password[item] = true;
            setArrayCheckForgotPassword(array_checker_forgot_password);
        });
        let checked_array = array_checker_forgot_password.every((item) => {
            return item == false;
        });
        if (checked_array === true) {
            try {
                const data = {
                    email: email,
                    password: password
                };
                const result = await UpdateStaffMemberPasswordService(data);
                if (result) {
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setPasswordUpdate(true);
                }
            } catch { }
        }
    };

    return (
        <div className='user-auth-wrapper'>
            <div className={activeClassLogIn}>
                <Button onClick={() => {
                    setAuth(1);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setLoginMessage("");
                    setArrayCheckSignUp(false);
                    setArrayCheckForgotPassword(false);
                    setActiveClassLogIn("form-tab active-form");
                    setActiveClassSignUp("form-tab");
                }}>Log In</Button>
            </div>
            <div className={activeClassSignUp}>
                <Button onClick={() => {
                    setAuth(2);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setLoginMessage("");
                    setArrayCheckLogIn(false);
                    setArrayCheckForgotPassword(false);
                    setActiveClassSignUp("form-tab active-form");
                    setActiveClassLogIn("form-tab");
                }}>Sign Up</Button>
            </div>
            {auth === 1 ?
                <div className='inner-main-form'>
                    <Form onSubmit={handleLogIn}>
                        <FormLayout>
                            <input
                                value={email}
                                onChange={(e) => handleEmailChange(e)}
                                placeholder="Email"
                                type="email"
                                className='user_login_required_cls'
                                index="0"
                            />
                            {arrayCheckLogIn[0] === true && <p className='user_auth_required'>This is a required field*</p>}
                            <input
                                value={password}
                                onChange={(e) => handlePasswordChange(e)}
                                placeholder="Password"
                                type="password"
                                className='user_login_required_cls'
                                index="1"
                            />
                            {arrayCheckLogIn[1] === true && <p className='user_auth_required'>This is a required field*</p>}
                            <Button submit>Submit</Button>
                        </FormLayout>
                    </Form>
                    <p className='login-message'>{loginMessage}</p>
                    <a href='#' onClick={() => {
                        setAuth(3);
                        setEmail("");
                        setPassword("");
                    }}>Forgot Password ?</a>
                </div>
                : auth === 2 ?
                    <div className='inner-main-form'>
                        <Form onSubmit={handleSignUp}>
                            <FormLayout>
                                <input
                                    value={name}
                                    onChange={(e) => handleNameChange(e)}
                                    type="text"
                                    placeholder="Name"
                                    className='user_signup_required_cls'
                                    index="0"
                                />
                                {arrayCheckSignUp[0] === true && <p className='user_auth_required'>This is a required field*</p>}
                                <input
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)}
                                    type="email"
                                    placeholder="Email"
                                    className='user_signup_required_cls'
                                    index="1"
                                />
                                {arrayCheckSignUp[1] === true && <p className='user_auth_required'>This is a required field*</p>}
                                <input
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e)}
                                    type="password"
                                    placeholder="Password"
                                    className='user_signup_required_cls'
                                    index="2"
                                />
                                {arrayCheckSignUp[2] === true && <p className='user_auth_required'>This is a required field*</p>}
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e)}
                                    type="password"
                                    placeholder="Confirm Password"
                                    className='user_signup_required_cls'
                                    index="3"
                                />
                                {arrayCheckSignUp[3] === true && <p className='user_auth_required'>This is a required field*</p>}
                                <Button submit>Submit</Button>
                            </FormLayout>
                        </Form>
                        {emailSent ? <p style={{ color: "#79a22e" }}>Email has been sent for verification</p> : null}
                    </div>
                    :
                    <div className='inner-main-form'>
                        <Form onSubmit={handleForgotPassword}>
                            <FormLayout>
                                <input
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)}
                                    type="email"
                                    placeholder="Email"
                                    className='user_forgot_password_required_cls'
                                    index="0"
                                />
                                {arrayCheckForgotPassword[0] === true && <p className='user_auth_required'>This is a required field*</p>}
                                <input
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e)}
                                    type="password"
                                    placeholder="Password"
                                    className='user_forgot_password_required_cls'
                                    index="1"
                                />
                                {arrayCheckForgotPassword[0] === true && <p className='user_auth_required'>This is a required field*</p>}
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e)}
                                    type="password"
                                    placeholder="Confirm Password"
                                    className='user_forgot_password_required_cls'
                                    index="2"
                                />
                                {arrayCheckForgotPassword[0] === true && <p className='user_auth_required'>This is a required field*</p>}
                                <Button submit>Submit</Button>
                            </FormLayout>
                        </Form>
                        {passwordUpdate ? <p style={{ color: "#79a22e" }}>Your Password has been Updated...go for Login</p> : null}
                    </div>
            }
        </div>
    );
}


/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {};
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        UserAuthAction: (user_auth, shop, shop_owner, staff_member_logged_in) => dispatch(UserAuthAction(user_auth, shop, shop_owner, staff_member_logged_in))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);