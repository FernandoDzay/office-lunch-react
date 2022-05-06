import {useState} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";
import Select from "../globals/Inputs/Select";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import InfoModal from "../../components/globals/Modal/InfoModal";
import {Navigate} from "react-router-dom";


export default function RegisterForm() {
    const api_url = process.env.REACT_APP_API_URL;
    const initialErrors = {
        username: "",
        email: "",
        password: "",
        confirm: ""
    };

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
        birth_month: "1",
        birth_day: "1"
    });
    const [validationErrors, setValidationErrors] = useState(initialErrors);
    const [goLogin, setGoLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalError, setModalError] = useState("Ocurrió un error inesperado");


    const changeHandler = (e) => setValues({...values, [e.target.name]: e.target.value});
    
    const validateForm = () => {
        const {username, email, password, confirm} = values;
        const currentValidationErrors = {...initialErrors};
        
        if(!isLength(username, {min: 4, max: 30})) currentValidationErrors.username = "Debe tener longitud entre 4 y 30";
        if(!isEmail(email)) currentValidationErrors.email = "Debe de ser email válido";
        if(isEmpty(confirm)) currentValidationErrors.confirm = "Este campo es requerido";
        if(!isLength(password, {min: 4, max: 30})) currentValidationErrors.password = "Debe tener longitud entre 4 y 30";
        else {
            if(password !== confirm) {
                currentValidationErrors.password = "No coincide la confirmación de password";
                currentValidationErrors.confirm = "No coincide la confirmación de password";
            }
        }

        setValidationErrors(currentValidationErrors);
        return JSON.stringify(currentValidationErrors) !== JSON.stringify(initialErrors);
    }

    const closeModalHandler = () => {
        setOpenModal(false);
        setModalError('');
        if(modalError !== '') return;

        setTimeout(() => { setGoLogin(true) }, 250);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(validateForm()) return;
        
        setLoading(true);
        
        fetch(`${api_url}/auth/register`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then(data => {
            setLoading(false);
            setOpenModal(true);
            if(data.error || data.validation) return setModalError(data.error);

            setModalError('');
        })
        .catch(e => {
            setLoading(false);
            setOpenModal(true);
            setModalError('Ocurrió un error inesperado');
        });
    }


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
            <AuthForm title="Regístrate" href="/login" linkText="Inicia sesión" submitText="Registrarme" loading={loading} submitHandler={onSubmitHandler}>

                <FormGroup message="Escribe tu Username" error={ validationErrors.username }>
                    <label htmlFor="username">Username</label>
                    <Input value={ values.username } onChangeHandler={ changeHandler } name="username" />
                </FormGroup>

                <FormGroup message="Escribe tu Email" error={ validationErrors.email }>
                    <label htmlFor="email">Email</label>
                    <Input value={ values.email } onChangeHandler={ changeHandler } name="email" />
                </FormGroup>

                <FormGroup message="Escribe tu Password" error={ validationErrors.password }>
                    <label htmlFor="password">Password</label>
                    <Input value={ values.password } onChangeHandler={ changeHandler } name="password" type="password" />
                </FormGroup>

                <FormGroup message="Confirma tu password" error={ validationErrors.confirm }>
                    <label htmlFor="confirm">Confirma tu password</label>
                    <Input value={ values.confirm } onChangeHandler={ changeHandler } name="confirm" type="password" />
                </FormGroup>

                <div className="grid-container">
                    <FormGroup message="Elige">
                        <label htmlFor="month">Mes de nacimiento</label>
                        <Select name="birth_month" value={values.birth_month} onChangeHandler={ changeHandler}>
                            { months.map( (month, i) => <option key={i} value={i + 1}>{month}</option> ) }
                        </Select>
                    </FormGroup>
                    <FormGroup message="Elige">
                        <label htmlFor="day">Día de nacimiento</label>
                        <Select name="birth_day" value={values.birth_day} onChangeHandler={ changeHandler}>
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
                handleCloseModal={closeModalHandler}
            />
        </>
    );
}