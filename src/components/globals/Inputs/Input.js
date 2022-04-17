export default function Input({name, type, value, onFocus, onBlur, onChangeHandler}) {

    return (
        <input type={type}
            name={name}
            value={value}
            autoComplete="off"
            onFocus={ onFocus }
            onBlur={ onBlur }
            onChange={ onChangeHandler }
        />
    );
}