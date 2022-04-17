import {Component} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";
import Select from "../globals/Inputs/Select";


class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: {
                username: "",
                password: "",
                confirm: "",
                month: "1",
                day: "1",
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
        
    }

    render() {

        const {username, password, confirm, month, day} = this.state.values;
        
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const days = [];
        for(let i=1; i <= 31; i++) {
            days.push(i);
        }

        return (
            <AuthForm title="Regístrate" href="/login" linkText="Inicia sesión" submitText="Registrarme" submitHandler={this.onSubmitHandler}>

                <FormGroup message="Escribe tu Username">
                    <label htmlFor="username">Username</label>
                    <Input value={ username } onChangeHandler={ this.changeHandler } name="username" />
                </FormGroup>

                <FormGroup message="Escribe tu Password">
                    <label htmlFor="password">Password</label>
                    <Input value={ password } onChangeHandler={ this.changeHandler } name="password" type="password" />
                </FormGroup>

                <FormGroup message="Confirma tu password">
                    <label htmlFor="confirm">Confirma tu password</label>
                    <Input value={ confirm } onChangeHandler={ this.changeHandler } name="confirm" type="password" />
                </FormGroup>

                <div className="grid-container">
                    <FormGroup message="Elige">
                        <label htmlFor="month">Mes de nacimiento</label>
                        <Select name="month" value={month} onChangeHandler={ this.changeHandler}>
                            { months.map( (month, i) => <option key={i} value={i + 1}>{month}</option> ) }
                        </Select>
                    </FormGroup>
                    <FormGroup message="Elige">
                        <label htmlFor="day">Día de nacimiento</label>
                        <Select name="day" value={day} onChangeHandler={ this.changeHandler}>
                            { days.map( (i) => <option key={i} value={i}>{i}</option> ) }
                        </Select>
                    </FormGroup>
                </div>

            </AuthForm>
        );
    }
}

export default RegisterForm;