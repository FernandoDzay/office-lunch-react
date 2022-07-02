import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../store/slices/paymentsSlice";
import Loader from "../../../../components/globals/Loader/Loader";
import UserPaymentsTable from "./UserPaymentsTable";
import FormGroup from '../../../../components/globals/Inputs/FormGroup';
import Input from '../../../../components/globals/Inputs/Input';
import Modal from '../../../../components/globals/Modal/Modal';
import { useState } from "react";
import Button from "../../../../components/globals/Button/Button";
import { createUserPayment } from "../../../../store/slices/paymentsSlice";
import { getLastWeekMonday } from "../../../../utils/dateHelper";

import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';


const PaymentModal = () => {
    const { modal, loadingUserPayments, loadingCreateUserPayment, dateText } = useSelector(state => state.payments);
    const dispatch = useDispatch();
    const [values, setValues] = useState({concept: '', quantity: ''});
    const [errors, setErrors] = useState({concept: '', quantity: ''});

    const handleChange = (e) => {
        if((e.target.name === 'quantity' && isNaN(e.target.value)) || e.nativeEvent.data === '.') return;
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(validateForm()) return;

        dispatch(createUserPayment({
            user_id: modal.user_id,
            concept: values.concept,
            payment_date: dateText ? dateText : getLastWeekMonday(),
            quantity: values.quantity
        }));
    }

    const handleCloseModal = () => {
        setValues({concept: '', quantity: ''});
        dispatch(closeModal());
    }

    const validateForm = () => {
        const {concept, quantity} = values;
        const currentValidationErrors = {concept: '', quantity: ''};

        if(!isLength(concept, {min: 4, max: 30})) currentValidationErrors.concept = "Debe tener longitud entre 4 y 30";
        if(isEmpty(quantity)) currentValidationErrors.quantity = "Este campo es requerido";

        setErrors(currentValidationErrors);
        return JSON.stringify(currentValidationErrors) !== JSON.stringify({concept: '', quantity: ''});
    }


    return (
        <Modal active={modal.active} nextStep={modal.nextStep} nextStepTitle={modal.nextStepTitle} handleCloseModal={handleCloseModal} withExit={true} >
            {loadingUserPayments ? <Loader size="3" color="blue" /> :
                <>
                    <p className="subtitle mb center">Pagos del usuario</p>
                    <UserPaymentsTable />

                    <form>
                        <FormGroup error={errors.concept}>
                            <label>Concepto</label>
                            <Input name="concept" value={values.concept} onChangeHandler={handleChange} />
                        </FormGroup>
                        <FormGroup error={errors.quantity}>
                            <label>Cantidad</label>
                            <Input name="quantity" value={values.quantity} onChangeHandler={handleChange} />
                        </FormGroup>

                        <Button color="blue" icon="plus" onClick={handleClick} loading={loadingCreateUserPayment}>Agregar pago</Button>
                    </form>
                </>
            }
        </Modal>
    );
}


export default PaymentModal;