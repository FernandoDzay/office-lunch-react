import { useEffect } from 'react';
import Table from '../../../components/globals/Table/Table';
import MenuTableRow from './MenuTableRow';
import { connect } from 'react-redux';
import {getMenu} from '../../container/actions';


const MenuTable = ({getMenu, menu, loadingMenu}) => {
    useEffect(() => getMenu(), [getMenu])
    const thead = ['#', 'Nombre', 'Precio', 'Descuento', 'Quitar'];

    return (
        <Table thead={thead} loading={menu.length > 0 ? false : loadingMenu}>
            {menu.map((menu, index) => <MenuTableRow key={menu.id} index={index} id={menu.id} food={menu.food} />)}
        </Table>
    );
}



const mapStateToProps = state => ({menu: state.viewReducers.menu, loadingMenu: state.viewReducers.loadingMenu});
const mapDispatchToProps = dispatch => ({getMenu: () => dispatch(getMenu())});
export default connect(mapStateToProps, mapDispatchToProps)(MenuTable);