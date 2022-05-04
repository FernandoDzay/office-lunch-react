import {Component} from 'react';
import {connect} from 'react-redux';
import {getExtras} from '../../container/actions';
import IconButton from '../../../components/globals/IconButton/IconButton';
import { Navigate } from 'react-router-dom';


class ExtraTableRow extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            deleteLoading: false,
            goEditExtra: false
        }
    }

    handleEditExtra = () => this.setState({goEditExtra: true});
    handleDeleteExtra = async () => {
        this.setState({deleteLoading: true});
        await fetch(`${this.api_url}/extras/delete/${this.props.extra.id}`, {method: 'DELETE', headers: {Authorization: `bearer ${this.token}`}});
        await this.props.getExtras();
        this.setState({deleteLoading: false});
    }


    render() {
        const {index, extra} = this.props;
        const {deleteLoading, goEditExtra} = this.state;


        if(goEditExtra) return <Navigate to={`/edit-extra?id=${extra.id}`} />;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{extra.name}</td>
                <td>{extra.price}</td>
                <td><IconButton color="orange" icon="edit" onClick={this.handleEditExtra} /></td>
                <td><IconButton color="red" icon="delete" loading={deleteLoading} onClick={this.handleDeleteExtra} /></td>
            </tr>
        );
    }

}


const mapDispatchToProps = dispatch => ({getExtras: async () => dispatch(getExtras())});
export default connect(null, mapDispatchToProps)(ExtraTableRow);