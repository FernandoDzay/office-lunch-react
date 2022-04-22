import {Component} from 'react';
import GenericFoodCard from './inheritance/FoodCard';

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
        .then(r => {
            // this.props.refreshOrders();
        })
        .catch(e => console.log(e))
        .finally(r => this.setState({loading: false}));
    }


    render() {
        const {full_name, image} = this.props;
        const {loading} = this.state;
        
        return <GenericFoodCard full_name={full_name} image={image} loading={loading} mainClick={this.addFood} btnText="Agregar" />;
    }

}


export default FoodCard;