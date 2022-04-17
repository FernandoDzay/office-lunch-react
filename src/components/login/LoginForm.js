import {Component} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: {
                username: "",
                password: ""
            }
        }
    }

    changeHandler = (e) => {
        const values = {...this.state.values};
        values[e.target.name] = e.target.value;
        this.setState({values});
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("click!!");
    }

    render() {
        const {username, password} = this.state.values;
         
        return (
            <AuthForm title="Inicia sesión con tu cuenta" href="/register" linkText="Regístrate" submitText="Iniciar sesión" submitHandler={this.onSubmitHandler}>

                <FormGroup message="Escribe tu Username">
                    <label htmlFor="username">Username</label>
                    <Input value={ username } onChangeHandler={ this.changeHandler } name="username" />
                </FormGroup>

                <FormGroup message="Escribe tu Password">
                    <label htmlFor="password">Password</label>
                    <Input value={ password } onChangeHandler={ this.changeHandler } name="password" type="password" />
                </FormGroup>

            </AuthForm>
        );
    }
}

export default LoginForm;