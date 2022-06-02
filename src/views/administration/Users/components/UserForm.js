import { useDispatch, useSelector } from "react-redux";
import FormGroup from "../../../../components/globals/Inputs/FormGroup";
import Input from "../../../../components/globals/Inputs/Input";
import Select from "../../../../components/globals/Inputs/Select";
import Switch from '../../../../components/globals/Switch/Switch';
import { handleInputsChange } from "../../../../store/slices/usersSlice";


const UserForm = () => {
    const { modal: {user, errors} } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const days = [];
    for(let i = 1; i <= 31; i++) {
        days.push(i);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        dispatch( handleInputsChange({name, value}) );
    }

    const handleAdminChange = (e, active) => {
        const name = 'is_admin';
        const value = active ? 1 : 0;
        dispatch( handleInputsChange({name, value}) );
    }

    const handleStatusChange = (e, active) => {
        const name = 'status';
        const value = active ? 1 : 0;
        dispatch( handleInputsChange({name, value}) );
    }


    return (
        <form>
            <FormGroup error={errors.username}>
                <label>Nombre</label>
                <Input value={user.username} name="username" onChangeHandler={handleInputChange} />
            </FormGroup>
            <FormGroup error={errors.email}>
                <label>Email</label>
                <Input value={user.email} name="email" onChangeHandler={handleInputChange} />
            </FormGroup>
            <div className="grid-container">
                <FormGroup forceNotEmpty={true}>
                    <label htmlFor="month">Mes de nacimiento</label>
                    <Select name="birth_month" value={user.birth_month} onChangeHandler={ handleInputChange}>
                        { months.map( (month, i) => <option key={i} value={i + 1}>{month}</option> ) }
                    </Select>
                </FormGroup>
                <FormGroup forceNotEmpty={true}>
                    <label htmlFor="day">Día de nacimiento</label>
                    <Select name="birth_day" value={user.birth_day} onChangeHandler={ handleInputChange}>
                        { days.map( (i) => <option key={i} value={i}>{i}</option> ) }
                    </Select>
                </FormGroup>
            </div>
            <div className="grid-container switch-container">
                <FormGroup forceNotEmpty={true} noBorderBottom={true} error={errors.is_admin}>
                    <label htmlFor="is_admin">Administrador</label>
                    <Switch active={user.is_admin} onClick={handleAdminChange} />
                </FormGroup>
                <FormGroup forceNotEmpty={true} noBorderBottom={true} error={errors.status}>
                    <label htmlFor="status">Status</label>
                    <Switch active={user.status} onClick={handleStatusChange} />
                </FormGroup>
            </div>
        </form>
    );
}


export default UserForm;