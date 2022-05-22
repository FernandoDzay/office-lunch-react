import Loader from "../Loader/Loader";

function Select({name, value, onFocus, onBlur, children, onChangeHandler, loading}) {

    if(loading) return (
        <Loader color="blue" size="1" />
    );
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

Select.defaultProps = {
    displayName: 'Select'
};

export default Select;