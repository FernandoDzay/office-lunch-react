import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/globals/Button/Button";
import Modal from "../../../../components/globals/Modal/Modal";
import { closeModal, submitForm, setModalErrors } from "../../../../store/slices/usersSlice";
import UserForm from "./UserForm";

import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';


const UserModal = () => {
    const { modal: {active, title, user, nextStep, updateLoading} } = useSelector(state => state.users);
    const stateTesting = useSelector(state => state.users);
    const logged_user_id = useSelector(state => state.layout.user.id);
    const dispatch = useDispatch();


    const handleCloseModal = () => {
        dispatch( closeModal() );
    }

    const getFormErrors = () => {
        const initialState = {
            username: '',
            email: '',
            is_admin: '',
            status: '',
        };
        const {username, email, is_admin, status} = user;
        const currentValidationErrors = {...initialState};
        
        if(!isLength(username, {min: 4, max: 30})) currentValidationErrors.username = "Debe tener longitud entre 4 y 30";
        if(!isEmail(email)) currentValidationErrors.email = "Debe de ser email válido";
        if(user.id === logged_user_id) {
            if(is_admin === 0) currentValidationErrors.is_admin = "No puedes cambiar este valor para tí mismo";
            if(status === 0) currentValidationErrors.status = "No puedes cambiar este valor para tí mismo";
        }
    
        const thereAreNoErrors = JSON.stringify(currentValidationErrors) === JSON.stringify(initialState);
        return thereAreNoErrors ? false : currentValidationErrors;
    }

    const handleSubmit = () => {
        const modalErrors = getFormErrors();
        if(modalErrors) return dispatch( setModalErrors(modalErrors) );
        dispatch( submitForm(user) );
    }
    

    return (
        <Modal active={active} nextStep={nextStep} nextStepTitle={title} handleCloseModal={handleCloseModal} >
            <p className="title center mb">{ title }</p>

            <UserForm />

            <div className="bot">
                <Button color="blue" loading={updateLoading} onClick={handleSubmit}>Modificar</Button>
                <Button color="red" onClick={handleCloseModal}>Cancelar</Button>
            </div>
        </Modal>
    );
}

export default UserModal;