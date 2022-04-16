export default function Input({name, value, onFocus, onBlur, onChangeHandler}) {

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

Input.defaultProps = {
    classes: ""
}