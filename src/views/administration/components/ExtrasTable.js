import { useEffect } from 'react';
import Table from '../../../components/globals/Table/Table';
import ExtraTableRow from './ExtraTableRow';
import { getExtras } from '../../../store/slices/extrasSlice';
import { useSelector, useDispatch } from 'react-redux';


const ExtraTable = () => {
    const { extras } = useSelector(state => state.extras);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getExtras()) }, [dispatch]);

    const thead = ['#', 'Nombre', 'Precio', 'Editar', 'Quitar'];

    return (
        <Table thead={thead} responsive={true}>
            {extras.map((extra, index) => <ExtraTableRow key={extra.id} index={index} extra={extra} />)}
        </Table>
    );
}


export default ExtraTable;