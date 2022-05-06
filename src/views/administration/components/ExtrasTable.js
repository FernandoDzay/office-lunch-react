import {useEffect} from 'react';
import Table from '../../../components/globals/Table/Table';
import {connect} from 'react-redux';
import {getExtras} from '../../container/actions';
import ExtraTableRow from './ExtraTableRow';


const ExtraTable = ({getExtras, extras}) => {

    useEffect(() => {
        getExtras();
    }, [getExtras])

    const thead = ['#', 'Nombre', 'Precio', 'Editar', 'Quitar'];

    return (
        <Table thead={thead} >
            {extras.map((extra, index) => <ExtraTableRow key={extra.id} index={index} extra={extra} />)}
        </Table>
    );
}


const mapStateToProps = state => ({extras: state.viewReducers.extras});
const mapDispatchToProps = dispatch => ({getExtras: () => dispatch(getExtras())});
export default connect(mapStateToProps, mapDispatchToProps)(ExtraTable);