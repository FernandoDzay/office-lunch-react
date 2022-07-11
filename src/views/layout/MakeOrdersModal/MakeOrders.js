import { CopyToClipboard } from 'react-copy-to-clipboard';
import Table from '../../../components/globals/Table/Table';
import Button from '../../../components/globals/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { copySuccess, makeOrders } from '../../../store/slices/layoutSlice';
import Loader from '../../../components/globals/Loader/Loader';


const MakeOrders = ({handleCloseModal}) => {
    const dispatch = useDispatch();
    const [textToCopy, setTextToCopy] = useState();
    const { makeOrders: {total, discount, net_total, orders}, loadingMakeOrders } = useSelector(state => state.layout);
    const areExtrasEmpty = orders.extras.length === 0;

    useEffect(() => {
        dispatch( makeOrders() );
    }, [dispatch]);

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


    if(loadingMakeOrders) return <Loader size="3" color="blue" withContainer={true} />;
    return (
        <>
            <p className="title center">Texto a copiar:</p>
        
            <div className="text-to-copy">
                <p className="copy-title">Comidas</p>
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
        </>
    );
}


export default MakeOrders;