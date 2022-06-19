import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/slices/ordersSlice';
import Modal from '../../../components/globals/Modal/Modal';


const OrdersModal = () => {
    const { modal: {active, title, description, nextStep} } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const handleCloseModal = () => { dispatch(closeModal()); }

    return (
        <Modal active={active} nextStepTitle={title} nextStepDescription={description} nextStep={nextStep} handleCloseModal={handleCloseModal}>
            <p className="title center">{ title }</p>
            <p className="description center">{ description }</p>
        </Modal>
    );
}


export default OrdersModal;