import React from 'react';
import './form-group.scss';
import Input from './Input';


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

export default FormGroup;