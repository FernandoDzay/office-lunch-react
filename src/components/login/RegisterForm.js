import {Component} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";


class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirm: "",
            month: "",
            day: "",
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

    confirmOnChangeHandler = (e) => {
        this.setState({
            confirm: e.target.value
        });
    }

    monthOnChangeHandler = (e) => {
        this.setState({
            month: e.target.value
        });
    }

    dayOnChangeHandler = (e) => {
        this.setState({
            day: e.target.value
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("click!!");
    }

    render() {

        const {username, password, confirm, month, day} = this.state;
        
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const days = [];
        for(let i=1; i <= 31; i++) {
            days.push(i);
        }

        return (
            <AuthForm title="Regístrate" href="/login" linkText="Inicia sesión" submitText="Registrarme" submitHandler={this.onSubmitHandler}>
                <FormGroup label={"Username"} name={"username"} message="Escribe tu Username" value={ username } onChangeHandler={ this.userOnChangeHandler } />
                <FormGroup label={"Password"} name={"password"} message="Escribe tu Password" value={ password } onChangeHandler={ this.passwordOnChangeHandler } />
                <FormGroup label={"Confirma tu password"} name={"confirm"} message="Confirma tu Password" value={ confirm } onChangeHandler={ this.confirmOnChangeHandler } />

                <div className="grid-container">
                    <FormGroup label={"Mes de nacimiento"} name={"month"} message="Elige" type="select" value={ month } onChangeHandler={ this.monthOnChangeHandler }>
                        { months.map( (month, i) => <option value={i + 1}>{month}</option> ) }
                    </FormGroup>
                    <FormGroup label={"Día de nacimiento"} name={"day"} message="Elige" type="select" value={ day } onChangeHandler={ this.dayOnChangeHandler }>
                        { days.map( (i) => <option value={i}>{i}</option> ) }
                    </FormGroup>
                </div>
            </AuthForm>
        );
    }
}

export default RegisterForm;