import {Component} from 'react';
import IconButton from '../../../components/globals/IconButton/IconButton';
import {connect} from 'react-redux';
import {getUserOrders} from '../../../redux/actions/layoutActions';


class TableRow extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            loading: false
        }
    }

    handleClick = () => {
        this.setState({loading: true});
        fetch(`${this.api_url}/orders/create-user-order`, {
            method: 'POST',
            headers: {Authorization: `bearer ${this.token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({extra_id: this.props.extra.id})
        })
        .then(r => r.json())
        .then(async data => {
            await this.props.getUserOrders();
            this.setState({loading: false});
        })
        .catch(error => this.setState({loading: false}));
    }

    render() {
        const {index, extra} = this.props;
        const {loading} = this.state;


        return (

            <tr>
                <td>{index}</td>
                <td>{extra.name}</td>
                <td>{extra.price}</td>
                <td><IconButton color="blue" icon="plus" loading={loading} onClick={this.handleClick} /></td>
            </tr>
        );
    }
}


const mapDispatchToProps = dispatch => ({getUserOrders: () => dispatch(getUserOrders())});
export default connect(null, mapDispatchToProps)(TableRow);