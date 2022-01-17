import react from "react";
import React from "react";
import "./LoginForm.scss";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
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
        return (
            <form className="login-form">
                <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
                <p className="title">{ this.props.title }</p>

                <FormGroup name={"Username"} value={ this.state.username } onChangeHandler={ this.userOnChangeHandler } />

                <FormGroup name={"Password"} value={ this.state.password } onChangeHandler={ this.passwordOnChangeHandler } />

                <Button onSubmitHandler={ this.onSubmitHandler } >Iniciar sesión</Button>

            </form>

            
        );
    }
}


class FormGroup extends react.Component {

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
        const {name, value, onChangeHandler} = this.props;
        const {isFocused} = this.state;

        if(value === '') isEmpty = true;
        else isEmpty = false;

        let classes = [
            'form-group',
            isFocused ? ' focused' : '',
            isEmpty ? ' empty' : ''
        ];

        return (
            <div className={classes.join('')}>
                <label htmlFor={ name }>{ name }</label>
                <Input 
                    name={ name } 
                    value={ value } 
                    onChangeHandler={ onChangeHandler }
                    onFocus={ this.handleFocus }
                    onBlur={ this.handleBlur }
                />
                <p className={"message"}>Escribe tu username</p>
            </div>
        );
    }
}

const Input = ({name, value, onFocus, onBlur, onChangeHandler}) => {

    return (
        <input type="text"
            name={name.toLowerCase()}
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