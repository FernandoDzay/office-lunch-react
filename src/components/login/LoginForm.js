import {useState} from "react";
import AuthForm from "./AuthForm";
import FormGroup from "../globals/Inputs/FormGroup";
import Input from "../globals/Inputs/Input";
import InfoModal from "../../components/globals/Modal/InfoModal";
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import {Navigate} from "react-router-dom";
import { login } from "../../store/slices/layoutSlice";
import { useDispatch } from "react-redux";


const LoginForm = () => {
    const dispatch = useDispatch();
    const initialErrors = {
        email: "",
        password: ""
    };

    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [validationErrors, setValidationErrors] = useState({...initialErrors});
    const [openModal, setOpenModal] = useState(false);
    const [modalError, setModalError] = useState("Ocurrió un error inesperado");
    const [loading, setLoading] = useState(false);
    const [goToApplication, setGoToApplication] = useState(false);

    const api_url = process.env.REACT_APP_API_URL;
    const changeHandler = (e) => setValues({...values, [e.target.name]: e.target.value});

    

    const validateForm = () => {
        const {email, password} = values;
        const currentValidationErrors = {...initialErrors};
        
        if(!isEmail(email)) currentValidationErrors.email = "Debe de ser email válido";
        if(!isLength(password, {min: 4, max: 30})) currentValidationErrors.password = "Debe tener longitud entre 4 y 30";

        setValidationErrors({...currentValidationErrors});
        return JSON.stringify(currentValidationErrors) !== JSON.stringify(initialErrors);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(validateForm()) return;

        setLoading(true);
        fetch(`${api_url}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then(data => {
            if(data.error) {
                setOpenModal(true);
                setModalError(data.error);
                return;
            }
            if(!data.token) throw new Error();
            dispatch(login());
            localStorage.setItem('token', data.token);
            setGoToApplication(true);
        })
        .catch(e => {
            setOpenModal(true);
            setModalError(e.error ? e.error : 'Ocurrió un error inseperado');
        })
        .finally(() => setLoading(false));
    }
        
    if(goToApplication) return <Navigate to="/" />
    return (
        <>
            <AuthForm title="Inicia sesión con tu cuenta" href="/register" linkText="Regístrate" submitText="Iniciar sesión" loading={loading} submitHandler={onSubmitHandler}>

                <FormGroup message="Escribe tu Username" error={validationErrors.email}>
                    <label htmlFor="username">Email</label>
                    <Input value={ values.email } onChangeHandler={ changeHandler } name="email" />
                </FormGroup>

                <FormGroup message="Escribe tu Password" error={validationErrors.password}>
                    <label htmlFor="password">Password</label>
                    <Input value={ values.password } onChangeHandler={ changeHandler } name="password" type="password" />
                </FormGroup>

            </AuthForm>

            <InfoModal
                active={openModal}
                type='fail'
                title='Ups!'
                description={modalError}
                handleCloseModal={() => setOpenModal(false)}
            />
        </>
    );
}


export default LoginForm;