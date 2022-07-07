import { useEffect } from 'react';
import Table from '../../../components/globals/Table/Table';
import MenuTableRow from './MenuTableRow';
import { getMenu } from '../../../store/slices/menuSlice';
import { useSelector, useDispatch } from 'react-redux';


const MenuTable = () => {
    const {menu, loadingMenu} = useSelector(state => state.menu);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getMenu()) }, [dispatch]);

    const thead = ['#', 'Nombre', 'Precio', 'Descuento', 'Quitar'];

    return (
        <Table thead={thead} loading={menu.length > 0 ? false : loadingMenu} responsive={true} withEnum={true}>
            {menu.map((menu, index) => <MenuTableRow key={menu.id} index={index} id={menu.id} food={menu.food} />)}
        </Table>
    );
}


export default MenuTable;