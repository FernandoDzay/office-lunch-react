export default function Input({name, type, value, onFocus, onBlur, onClick, onChangeHandler, id}) {

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