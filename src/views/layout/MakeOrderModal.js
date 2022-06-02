import Modal from '../../components/globals/Modal/Modal';
import Button from '../../components/globals/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { closeMakeOrdersModal } from '../../store/slices/layoutSlice';


const MakeOrderModal = ({nextStep, handleNextStep}) => {
    const { active } = useSelector(state => state.layout.activeMakeOrdersModal);
    const dispatch = useDispatch();

    const handleCloseModal = () => dispatch(closeMakeOrdersModal());

    return (
        <Modal active={active} nextStep={nextStep} handleCloseModal={handleCloseModal} >
            <div className="bot">
                <Button color="blue" icon="copy" onClick={handleNextStep}>Copiar</Button>
                <Button color="red" icon="close-circle" onClick={handleCloseModal}>Cerrar</Button>
            </div>
        </Modal>
    );
}


export default MakeOrderModal;