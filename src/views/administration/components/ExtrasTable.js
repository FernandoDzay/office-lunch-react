import {Component} from 'react';
import Table from '../../../components/globals/Table/Table';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { Navigate } from 'react-router-dom';



class ExtraTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            goId: '',
            goEditExtra: false
        };
    }

    render() {
        const {goEditExtra, goId} = this.state;
        const {extras, handleDeleteExtra} = this.props;
        const extrasTableData = {
            thead: ['#', 'Nombre', 'Precio', 'Editar', 'Quitar'],
            tbody:
            extras.map(
                (extra, index) => 
                [
                    index + 1,
                    extra.name,
                    extra.price,
                    <IconButton key={extra.id} onClick={() => this.setState({goId: extra.id, goEditExtra: true})} icon="edit" color="orange" />,
                    <IconButton key={extra.id} loading={extra.loading} onClick={() => handleDeleteExtra(index, extra.id)} icon="delete" color="red" />
                ]
            )
        };


        if(goEditExtra) return <Navigate to={`/edit-extra?id=${goId}`} />;
        return <Table data={extrasTableData} />;
    }
}


export default ExtraTable;