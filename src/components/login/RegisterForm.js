import {Component} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";
import Select from "../globals/Inputs/Select";


class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirm: "",
            month: "1",
            day: "1",
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

                <FormGroup message="Escribe tu Username">
                    <label htmlFor="username">Username</label>
                    <Input value={ username } onChangeHandler={ this.userOnChangeHandler } name="username" />
                </FormGroup>

                <FormGroup message="Escribe tu Password">
                    <label htmlFor="password">Password</label>
                    <Input value={ password } onChangeHandler={ this.passwordOnChangeHandler } name="password" type="password" />
                </FormGroup>

                <FormGroup message="Confirma tu password">
                    <label htmlFor="confirm">Confirma tu password</label>
                    <Input value={ confirm } onChangeHandler={ this.confirmOnChangeHandler } name="confirm" type="password" />
                </FormGroup>

                <div className="grid-container">
                    <FormGroup message="Elige">
                        <label htmlFor="month">Mes de nacimiento</label>
                        <Select name="month" value={month} onChangeHandler={ this.monthOnChangeHandler}>
                            { months.map( (month, i) => <option key={i} value={i + 1}>{month}</option> ) }
                        </Select>
                    </FormGroup>
                    <FormGroup message="Elige">
                        <label htmlFor="day">Día de nacimiento</label>
                        <Select name="day" value={day} onChangeHandler={ this.dayOnChangeHandler}>
                            { days.map( (i) => <option key={i} value={i}>{i}</option> ) }
                        </Select>
                    </FormGroup>
                </div>

            </AuthForm>
        );
    }
}

export default RegisterForm;