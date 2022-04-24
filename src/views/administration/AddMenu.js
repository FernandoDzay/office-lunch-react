import {Component} from 'react';
import Layout from '../layout/Layout';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodCard from '../../components/globals/FoodCard/AdminFoodCard';
import {Navigate} from "react-router-dom";
import Loader from '../../components/globals/Loader/Loader';
import Tabs from '../../components/globals/Tabs/Tabs';
import MenuTable from './components/MenuTable';
import ExtrasTable from './components/ExtrasTable';


class AddMenu extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            menuLoading: true,
            foodsLoading: true,
            goLogin: false,
            menu: [],
            foods: [],
            extras: [],
        }
    }

    componentDidMount() {
        this.getMenu();
        this.getFoods();
        this.getExtras();
    }

    transformMenuState = (menu, clickedIndex) => menu.map((data, index) => ({...data, loading: index === clickedIndex}));
    transformExtraState = (extras, clickedIndex) => extras.map((extra, index) => ({...extra, loading: index === clickedIndex}));

    getMenu = () => {
        if(this.state.menu.length === 0) this.setState({menuLoading: true});
        fetch(`${this.api_url}/menu/get`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.error) throw new Error('Ocurrió un error inesperado');
            if(data.authError !== undefined) return this.setState({goLogin: true});
            this.setState({menuLoading: false, menu: data.menu});
        })
        .catch(e => this.setState({menuLoading: false}));
    }

    getFoods = () => {
        if(this.state.foods.length === 0) this.setState({foodsLoading: true});
        fetch(`${this.api_url}/foods`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.error) throw new Error('Ocurrió un error inseperado');
            this.setState({foodsLoading: false, foods: data});
        })
        .catch(e => this.setState({foodsLoading: false}))
    }

    getExtras = () => {
        fetch(`${this.api_url}/extras`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.error) throw new Error('Ocurrió un error inseperado');
            this.setState({extras: data});
        })
        .catch(r => {});
    }

    handleDeleteMenu = async (clickedIndex, id) => {
        const menu = this.transformMenuState(this.state.menu, clickedIndex);
        this.setState({menu});
        await fetch(`${this.api_url}/menu/remove-food/${id}`, {method: 'DELETE', headers: {Authorization: `bearer ${this.token}`}});
        await this.getMenu();
    }

    handleDeleteExtra = async (clickedIndex, id) => {
        const extras = this.transformExtraState(this.state.extras, clickedIndex);
        this.setState({extras});
        await fetch(`${this.api_url}/extras/delete/${id}`, {method: 'DELETE', headers: {Authorization: `bearer ${this.token}`}});
        await this.getExtras();
    }


    render() {
        const {goLogin, foodsLoading, menuLoading, foods, menu, extras} = this.state;

        if(goLogin) return <Navigate to={`/login?${new URLSearchParams({error: 'Tu sesión ha expirado'}).toString()}`} />;
        return (
            <>
                
                <ViewTitle>Agregar al menú</ViewTitle>
                <ViewDescription>En esta sección puedes agregar las comidas disponibles que hayas configurado.</ViewDescription>
                <Tabs
                    loading={menuLoading}
                    tabsText={['Comidas agregadas al menú', 'Extras']}
                    tabsContent={[
                        <MenuTable menu={menu} handleDeleteMenu={this.handleDeleteMenu} />,
                        <ExtrasTable extras={extras} handleDeleteExtra={this.handleDeleteExtra} />,
                    ]}
                />

                <ViewTitle>Comidas</ViewTitle>
                <div className="food-cards-container">{
                    foodsLoading ? 
                        <Loader color="blue" size="3" />
                    :
                        foods.map(food => <FoodCard key={food.id} mainClick={this.getMenu} deleteClick={this.getFoods} {...food} />)
                }</div>

            </>
        );
    }
}


export default AddMenu;