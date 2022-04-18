import {Component} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";
import InfoModal from "../../components/globals/Modal/InfoModal";
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import {Navigate} from "react-router-dom";


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.initialErrors = {
            email: "",
            password: ""
        };

        this.state = {
            values: {
                email: "",
                password: "",
            },
            goToApplication: false,
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
        const {email, password} = this.state.values;
        const validationErrors = {...this.initialErrors};
        
        if(!isEmail(email)) validationErrors.email = "Debe de ser email válido";
        if(!isLength(password, {min: 4, max: 30})) validationErrors.password = "Debe tener longitud entre 4 y 30";

        this.setState({validationErrors});
        return JSON.stringify(validationErrors) !== JSON.stringify(this.initialErrors);
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        if(this.validateForm()) return;

        this.setState({loading: true});
        fetch(`${this.api_url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.values)
        })
        .then(r => r.json())
        .then(data => {
            if(data.error) return this.setState({loading: false, openModal: true, modalError: data.error});
            localStorage.setItem('token', data.token);
            this.setState({loading: false, goToApplication: true});
        })
        .catch(e => this.setState({loading: false, openModal: true, modalError: 'Ocurrió un error inseperado'}));
    }

    render() {
        const {values, validationErrors, modalError, openModal, loading, goToApplication} = this.state;
        
        if(goToApplication) return <Navigate to="/" />
        return (
            <>
                <AuthForm title="Inicia sesión con tu cuenta" href="/register" linkText="Regístrate" submitText="Iniciar sesión" loading={loading} submitHandler={this.onSubmitHandler}>

                    <FormGroup message="Escribe tu Username" error={validationErrors.email}>
                        <label htmlFor="username">Email</label>
                        <Input value={ values.email } onChangeHandler={ this.changeHandler } name="email" />
                    </FormGroup>

                    <FormGroup message="Escribe tu Password" error={validationErrors.password}>
                        <label htmlFor="password">Password</label>
                        <Input value={ values.password } onChangeHandler={ this.changeHandler } name="password" type="password" />
                    </FormGroup>

                </AuthForm>

                <InfoModal
                    active={openModal}
                    type='fail'
                    title='Ups!'
                    description={modalError}
                    handleCloseModal={() => this.setState({openModal: false})}
                />
            </>
        );
    }
}

export default LoginForm;