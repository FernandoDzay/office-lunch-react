export default function Select({name, value, onFocus, onBlur, children, onChangeHandler}) {

    return (
        <select
            name={name}
            value={value}
            onFocus={ onFocus }
            onBlur={ onBlur }
            onChange={ onChangeHandler }
        >
            {children}
        </select>
    );
}