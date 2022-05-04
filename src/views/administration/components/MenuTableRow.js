import {Component} from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import {getMenu} from '../../container/actions';
import {connect} from 'react-redux';


class MenuTableRow extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            loading: false
        }
    }


    handleDeleteMenu = async () => {
        const id = this.props.id;
        this.setState({loading: true});
        await fetch(`${this.api_url}/menu/remove-food/${id}`, {method: 'DELETE', headers: {Authorization: `bearer ${this.token}`}});
        await this.props.getMenu();
        this.setState({loading: false});
    }


    render() {
        const {index, food} = this.props;
        const {loading} = this.state;


        return (
            <tr>
                <td>{index + 1}</td>
                <td>{food.full_name}</td>
                <td>{food.price}</td>
                <td>{food.discount}</td>
                <td><IconButton loading={loading} onClick={this.handleDeleteMenu} icon="delete" color="red" /></td>
            </tr>
        );
    }
}


const mapDispatchToProps = dispatch => ({getMenu: () => dispatch(getMenu())});
export default connect(null, mapDispatchToProps)(MenuTableRow);