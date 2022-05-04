import {Component} from 'react';
import GenericFoodCard from './inheritance/FoodCard';
import {connect} from 'react-redux';
import {getUserOrders} from '../../../redux/actions/layoutActions';

class FoodCard extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');
        this.state = {
            loading: false
        }
    }

    addFood = () => {
        this.setState({loading: true});
        fetch(`${this.api_url}/orders/create-user-order`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({food_id: this.props.id})
        })
        .then(r => r.json())
        .then(r => this.props.getUserOrders())
        .catch(e => console.log(e))
        .finally(r => this.setState({loading: false}));
    }


    render() {
        const {full_name, image} = this.props;
        const {loading} = this.state;
        
        return <GenericFoodCard full_name={full_name} image={image} loading={loading} mainClick={this.addFood} btnText="Agregar" />;
    }

}


const mapDispatchToProps = dispatch => ({getUserOrders: () => dispatch(getUserOrders())});
export default connect(null, mapDispatchToProps)(FoodCard);