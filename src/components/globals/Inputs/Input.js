const Input = ({name, type, value, onFocus, onBlur, onClick, onChangeHandler}) => {

    return (
        <input type={type}
            name={name}
            value={value}
            autoComplete="off"
            onFocus={ onFocus }
            onBlur={ onBlur }
            onClick={ onClick }
            onChange={ onChangeHandler }
        />
    );
}

Input.defaultProps = {
    displayName: 'Input'
};

export default Input;