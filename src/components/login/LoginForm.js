import React from "react";
import "./LoginForm.scss";


class LoginForm extends React.Component {

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
        const {mode} = this.props;
        
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const days = [];
        for(let i=1; i <= 31; i++) {
            days.push(i);
        }

        if(mode === "register") {
            return (
                <form className="login-form">
                    <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
                    <p className="title">Regístrate</p>
    
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

                    
                    <a href="/login" className="link">Inicia sesión</a>
    
                    <Button onSubmitHandler={ this.onSubmitHandler } >Registrarse</Button>
    
                </form>
            );
        }
        else {
            return (
                <form className="login-form">
                    <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
                    <p className="title">Inicia sesión con tu cuenta</p>
    
                    <FormGroup label={"Username"} name={"Username"} message="Escribe tu Username" value={ username } onChangeHandler={ this.userOnChangeHandler } />
                    <FormGroup label={"Password"} name={"Password"} message="Escribe tu Password" value={ password } onChangeHandler={ this.passwordOnChangeHandler } />
                    
                    <a href="/register" className="link">Regístrate</a>
    
                    <Button onSubmitHandler={ this.onSubmitHandler } >Iniciar sesión</Button>
    
                </form>
            );
        }
    }
}


class FormGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        }
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    render() {

        let isEmpty;
        const {name, label, type, children, message, value, onChangeHandler} = this.props;
        const {isFocused} = this.state;

        if(value === '') isEmpty = true;
        else isEmpty = false;

        let classes = [
            'form-group',
            isFocused ? ' focused' : '',
            isEmpty ? ' empty' : ''
        ];

        if(this.props.type != null && this.props.type === "select") {
            classes[2] = '';
        }

        if(type === "input" || type === "password" || type == null) {
            return (
                <div className={classes.join('')}>
                    <label htmlFor={ name }>{ label }</label>
                    <Input 
                        label={ label } 
                        name={ name } 
                        value={ value } 
                        onChangeHandler={ onChangeHandler }
                        onFocus={ this.handleFocus }
                        onBlur={ this.handleBlur }
                    />
                    <p className={"message"}>{ message }</p>
                </div>
            );
        }
        if(type === "select") {
            return (
                <div className={classes.join('')}>
                    <label htmlFor={ name }>{ label }</label>
                    <select
                        label={ label }
                        name={ name }
                        value={ value }
                        onChange={ onChangeHandler }
                        onFocus={ this.handleFocus }
                        onBlur={ this.handleBlur }
                    >
                        { children }
                    </select>
                    <p className={"message"}>{ message }</p>
                </div>
            );
        }
    }
}

const Input = ({name, value, onFocus, onBlur, onChangeHandler}) => {

    return (
        <input type="text"
            name={name}
            value={value}
            autoComplete="off"
            onFocus={ onFocus }
            onBlur={ onBlur }
            onChange={ onChangeHandler }
        />
    );
}

const Button = ({onSubmitHandler, children}) => {
    return(
        <button onClick={ onSubmitHandler } >{children}</button>
    );
}

Input.defaultProps = {
    classes: ""
}


export default LoginForm;