import Modal from '../../../components/globals/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeMakeOrdersModal } from '../../../store/slices/layoutSlice';
import { getMenu } from '../../../store/slices/menuSlice';
import './make-orders-modal.scss';
import MakeOrders from './MakeOrders';
import AskingForConfirm from './AskingForConfirm';
import { useState } from 'react';


const MakeOrdersModal = () => {
    const { makeOrdersModal: {active, title, description, nextStep} } = useSelector(state => state.layout);
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);

    const handleCloseModal = () => {
        dispatch(closeMakeOrdersModal());
        if(confirm) dispatch(getMenu());
        setTimeout(() => {
            setConfirm(false);
        }, 300);
    }


    return (
        <Modal active={active} handleCloseModal={handleCloseModal} nextStep={nextStep} nextStepTitle={title} nextStepDescription={description}>
            {confirm ?
                <MakeOrders handleCloseModal={handleCloseModal} />
                :
                <AskingForConfirm setConfirm={() => setConfirm(true)} handleCloseModal={handleCloseModal} />
            }
        </Modal>
    );
}


export default MakeOrdersModal;