import {Component} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    userOnChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    passwordOnChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("click!!");
    }

    render() {
        const {username, password} = this.state;
         
        return (
            <AuthForm title="Inicia sesión con tu cuenta" href="/register" linkText="Regístrate" submitText="Iniciar sesión" submitHandler={this.onSubmitHandler}>

                <FormGroup message="Escribe tu Username">
                    <label htmlFor="username">Username</label>
                    <Input value={ username } onChangeHandler={ this.userOnChangeHandler } name="username" />
                </FormGroup>

                <FormGroup message="Escribe tu Password">
                    <label htmlFor="password">Password</label>
                    <Input value={ password } onChangeHandler={ this.passwordOnChangeHandler } name="password" type="password" />
                </FormGroup>

            </AuthForm>
        );
    }
}

export default LoginForm;