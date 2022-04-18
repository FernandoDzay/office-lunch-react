import {Component} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";
import Select from "../globals/Inputs/Select";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import InfoModal from "../../components/globals/Modal/InfoModal";
import {Navigate} from "react-router-dom";


class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.initialErrors = {
            username: "",
            email: "",
            password: "",
            confirm: ""
        };
        
        this.state = {
            values: {
                username: "",
                email: "",
                password: "",
                confirm: "",
                birth_month: "1",
                birth_day: "1"
            },
            goLogin: false,
            loading: false,
            validationErrors: this.initialErrors,
            openModal: false,
            modalError: "Ocurrió un error inesperado",
        };
    }

    changeHandler = (e) => {
        const values = {...this.state.values};
        values[e.target.name] = e.target.value;
        this.setState({values});
    }
    
    validateForm = () => {
        const {username, email, password, confirm} = this.state.values;
        const validationErrors = {...this.initialErrors};
        
        if(!isLength(username, {min: 4, max: 30})) validationErrors.username = "Debe tener longitud entre 4 y 30";
        if(!isEmail(email)) validationErrors.email = "Debe de ser email válido";
        if(isEmpty(confirm)) validationErrors.confirm = "Este campo es requerido";
        if(!isLength(password, {min: 4, max: 30})) validationErrors.password = "Debe tener longitud entre 4 y 30";
        else {
            if(password !== confirm) {
                validationErrors.password = "No coincide la confirmación de password";
                validationErrors.confirm = "No coincide la confirmación de password";
            }
        }

        this.setState({validationErrors});
        return JSON.stringify(validationErrors) !== JSON.stringify(this.initialErrors);
    }

    closeModalHandler = () => {
        if(this.state.modalError !== '') return this.setState({openModal: false, modalError: ''});
        this.setState({openModal: false, modalError: ''});
        setTimeout(() => { this.setState({goLogin: true}) }, 250);
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        if(this.validateForm()) return;
        
        this.setState({loading: true});
        
        fetch(`${this.api_url}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.values)
        })
        .then(r => r.json())
        .then(data => {
            if(data.error) return this.setState({openModal: true, modalError: data.error, loading: false});
            this.setState({loading: false, openModal: true, modalError: ''});
        })
        .catch(e => this.setState({loading: false, openModal: true, modalError: 'Ocurrió un error inesperado'}));
    }

    render() {
        const {values, validationErrors, modalError, openModal, loading, goLogin} = this.state;
        let modalType = null;
        if(openModal) modalType = modalError.length > 0 ? 'fail' : 'success';
        
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const days = [];
        for(let i=1; i <= 31; i++) {
            days.push(i);
        }

        const modal = {
            fail: {description: modalError},
            success: {
                title: 'Cuenta creada',
                description: 'Tu cuenta ha sido creada con éxito, intenta loguearte con los mismos datos registrados'
            }
        };

        if(goLogin) return <Navigate to="/login" />
        return (
            <>
                <AuthForm title="Regístrate" href="/login" linkText="Inicia sesión" submitText="Registrarme" loading={loading} submitHandler={this.onSubmitHandler}>

                    <FormGroup message="Escribe tu Username" error={ validationErrors.username }>
                        <label htmlFor="username">Username</label>
                        <Input value={ values.username } onChangeHandler={ this.changeHandler } name="username" />
                    </FormGroup>

                    <FormGroup message="Escribe tu Email" error={ validationErrors.email }>
                        <label htmlFor="email">Email</label>
                        <Input value={ values.email } onChangeHandler={ this.changeHandler } name="email" />
                    </FormGroup>

                    <FormGroup message="Escribe tu Password" error={ validationErrors.password }>
                        <label htmlFor="password">Password</label>
                        <Input value={ values.password } onChangeHandler={ this.changeHandler } name="password" type="password" />
                    </FormGroup>

                    <FormGroup message="Confirma tu password" error={ validationErrors.confirm }>
                        <label htmlFor="confirm">Confirma tu password</label>
                        <Input value={ values.confirm } onChangeHandler={ this.changeHandler } name="confirm" type="password" />
                    </FormGroup>

                    <div className="grid-container">
                        <FormGroup message="Elige">
                            <label htmlFor="month">Mes de nacimiento</label>
                            <Select name="birth_month" value={values.birth_month} onChangeHandler={ this.changeHandler}>
                                { months.map( (month, i) => <option key={i} value={i + 1}>{month}</option> ) }
                            </Select>
                        </FormGroup>
                        <FormGroup message="Elige">
                            <label htmlFor="day">Día de nacimiento</label>
                            <Select name="birth_day" value={values.birth_day} onChangeHandler={ this.changeHandler}>
                                { days.map( (i) => <option key={i} value={i}>{i}</option> ) }
                            </Select>
                        </FormGroup>
                    </div>

                </AuthForm>

                <InfoModal
                    active={openModal}
                    type={modalType}
                    title={ modalType === 'success' ? modal[modalType].title : '' }
                    description={modalType ? modal[modalType].description : '' }
                    handleCloseModal={this.closeModalHandler}
                />
            </>
        );
    }
}

export default RegisterForm;