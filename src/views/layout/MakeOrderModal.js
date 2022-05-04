import {Component} from 'react';
import Modal from '../../components/globals/Modal/Modal';
import Button from '../../components/globals/Button/Button';
import {connect} from 'react-redux';
import {closeMakeOrdersModal} from '../../redux/actions/layoutActions';


class MakeOrderModal extends Component {


    render() {
        const {active, nextStep, handleCloseModal, handleNextStep} = this.props;

        return (
            <Modal active={active} nextStep={nextStep} handleCloseModal={handleCloseModal} >
                <div className="bot">
                    <Button color="blue" icon="copy" onClick={handleNextStep}>Copiar</Button>
                    <Button color="red" icon="close-circle" onClick={handleCloseModal}>Cerrar</Button>
                </div>
            </Modal>
        );
    }
}


const mapStateToProps = state => ({active: state.layoutReducers.activeMakeOrdersModal});
const mapDispatchToProps = dispatch => ({handleCloseModal: () => dispatch(closeMakeOrdersModal())});
export default connect(mapStateToProps, mapDispatchToProps)(MakeOrderModal);