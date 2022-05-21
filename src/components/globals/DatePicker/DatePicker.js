import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FormGroup from '../Inputs/FormGroup';
import Input from '../Inputs/Input';
import { forwardRef } from 'react';


const MyDatePicker = ({date, onChange}) => {
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <FormGroup>
            <label htmlFor="">Día de la semana deseada</label>
            <Input onClick={onClick} onChangeHandler={() => {}} value={value} ref={ref} />
        </FormGroup>
    ));

    return (
        <DatePicker
            selected={date}
            onChange={onChange}
            customInput={<CustomInput />}
            maxDate={new Date()}
            dateFormat='yyyy-MM-dd'
            className='date-picker'
        />
    );
}


export default MyDatePicker;