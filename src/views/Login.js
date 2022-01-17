import React from "react";
import LoginForm from "../components/login/LoginForm";
import "../libraries/icons/css/icons.scss";
import "../styles/globals/fonts.scss";
import "../styles/Login.scss";

class Login extends React.Component {

    /* constructor(props) {
        super(props);
    } */

    render() {
        return (
            <LoginForm title={"Inicia sesión con tu cuenta"} />
        );
    }

}

export default Login;