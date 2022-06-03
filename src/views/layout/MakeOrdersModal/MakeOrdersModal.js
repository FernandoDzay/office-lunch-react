import Modal from '../../../components/globals/Modal/Modal';
import Button from '../../../components/globals/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { closeMakeOrdersModal, makeOrders, copySuccess } from '../../../store/slices/layoutSlice';
import Table from '../../../components/globals/Table/Table';
import { useEffect, useState } from 'react';
import Loader from '../../../components/globals/Loader/Loader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './make-orders-modal.scss';


const MakeOrdersModal = () => {
    const thead = ['Cantidad', 'Nombre'];
    const { active } = useSelector(state => state.layout.makeOrdersModal);
    const { makeOrders: {total, discount, net_total, orders}, makeOrdersModal: {nextStep, nextStepTitle}, loadingMakeOrders } = useSelector(state => state.layout);
    const areFoodsEmpty = orders.foods.length === 0;
    const areExtrasEmpty = orders.extras.length === 0;
    const dispatch = useDispatch();
    const handleCloseModal = () => dispatch(closeMakeOrdersModal());
    const [textToCopy, setTextToCopy] = useState();

    useEffect(() => {
        if(active) {
            dispatch( makeOrders() );
        }
    }, [dispatch, active]);

    useEffect(() => {
        let text = 'El pedido de hoy será:\n\n';
        text += orders.foods.map(food => `${food.quantity} ${food.name}\n`);
        text += '\n';
        if(!areExtrasEmpty) {
            text += 'Extras:\n';
            text += orders.extras.map(extra => `${extra.quantity} ${extra.name}\n`);
        }
        text = text.replaceAll(',', '');

        setTextToCopy(text);
    }, [orders, areExtrasEmpty]);

    const handleCopyClick = () => {
        dispatch(copySuccess());
    }


    if(loadingMakeOrders) {
        return (
            <Modal active={active} handleCloseModal={handleCloseModal} nextStep={null}>
                <Loader size="3" color="blue" withContainer={true} />
            </Modal>
        );
    }
    if(areFoodsEmpty) {
        return (
            <Modal active={active} handleCloseModal={handleCloseModal} nextStep={null}>
                <p className="title">Aún no hay comidas</p>
            </Modal>
        );
    }
    return (
        <Modal active={active} handleCloseModal={handleCloseModal} nextStep={nextStep} nextStepTitle={nextStepTitle}>

            {/* <p className="description mb"><strong>Comidas</strong></p>
            <Table thead={thead}>
                {orders.foods.map((food, index) => (
                    <tr key={index}>
                        <td>{ food.quantity }</td>
                        <td>{ food.name }</td>
                    </tr>
                ))}
            </Table>
            
            {areExtrasEmpty ? null :
                <>
                    <p className="description mb"><strong>Extras</strong></p>
                    <Table thead={thead}>
                        {orders.extras.map((extra, index) => (
                            <tr key={index}>
                                <td>{ extra.quantity }</td>
                                <td>{ extra.name }</td>
                            </tr>
                        ))}
                    </Table>
                </>
            }
            
            <p className="description mb"><strong>Totales</strong></p>
            <Table thead={['Total', 'Cantidad']}>
                <tr>
                    <td>Para pagar:</td>
                    <td>{ total }</td>
                </tr>
                <tr>
                    <td>Descuentos:</td>
                    <td>{ discount }</td>
                </tr>
                <tr>
                    <td>Precio usuarios:</td>
                    <td>{ net_total }</td>
                </tr>
            </Table> */}

            <p className="title center">Texto a copiar:</p>

            <div className="text-to-copy">
                <p className="copy-title">Comida</p>
                {orders.foods.map((food, index) => <p key={index}>{food.quantity} {food.name}</p>)}

                {areExtrasEmpty ? null :
                    <>
                        <p className="copy-title">Extras</p>
                        {orders.extras.map((extra, index) => <p key={index}>{extra.quantity} {extra.name}</p>)}
                    </>
                }
            </div>

            <Table thead={['Total', 'Cantidad']}>
                <tr>
                    <td>Para pagar:</td>
                    <td>{ total }</td>
                </tr>
                <tr>
                    <td>Descuentos:</td>
                    <td>{ discount }</td>
                </tr>
                <tr>
                    <td>Precio usuarios:</td>
                    <td>{ net_total }</td>
                </tr>
            </Table>

            <div className="bot">
                <CopyToClipboard text={textToCopy} onCopy={handleCopyClick}>
                    <Button color="blue" icon="copy">Copiar</Button>
                </CopyToClipboard>
                <Button color="red" icon="close-circle" onClick={handleCloseModal}>Cerrar</Button>
            </div>
        </Modal>
    );
}


export default MakeOrdersModal;