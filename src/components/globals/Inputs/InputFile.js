import React from 'react';
import Input from './Input';


function InputFile(props) {
    const {name, value, onChangeHandler} = props;
    const inputFileRef = React.createRef()
    
    function handleClick() {
        inputFileRef.current.click();
    }

    return (
        <>
            <Input {...props} value={value.name ? value.name : '' } onClick={handleClick} onChangeHandler={() => {}} />
            <input ref={inputFileRef} type='file' name={name} onChange={ onChangeHandler } />
        </>
    );
}

InputFile.defaultProps = {
    displayName: 'InputFile'
};

export default InputFile;