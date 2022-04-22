import {Component} from 'react';
import Layout from '../layout/Layout';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodCard from '../../components/globals/FoodCard/AdminFoodCard';
import {Navigate} from "react-router-dom";
import Loader from '../../components/globals/Loader/Loader';
import Table from '../../components/globals/Table/Table';
import Tabs from '../../components/globals/Tabs/Tabs';
import IconButton from '../../components/globals/IconButton/IconButton';


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

    getMenu = () => {
        if(this.state.menu.length === 0) this.setState({menuLoading: true});
        fetch(`${this.api_url}/menu/get`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.error) throw new Error('Ocurrió un error inesperado');
            if(data.authError !== undefined) return this.setState({goLogin: true});

            // const menuState = data.menu.map(data => ({id: data.id, loading: false, food: {...data.food}}));
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


    render() {
        const {goLogin, foodsLoading, menuLoading, foods, menu} = this.state;
        const tableData = {
            thead: ['#', 'Nombre', 'Precio', 'Descuento', 'Quitar'],
            tbody: 
            menu.map(
                (menu, index) => 
                [
                    index + 1,
                    menu.food.full_name,
                    menu.food.price,
                    menu.food.discount,
                    <IconButton key={menu.id} loading={menu.loading} onClick={() => this.handleDeleteMenu(index, menu.id)} icon="delete" color="red" />
                ]
            )
        };


        if(goLogin) return <Navigate to={`/login?${new URLSearchParams({error: 'Tu sesión ha expirado'}).toString()}`} />;
        return (
            <Layout>
                
                <ViewTitle>Agregar al menú</ViewTitle>
                <ViewDescription>En esta sección puedes agregar las comidas disponibles que hayas configurado.</ViewDescription>

                <ViewTitle>Menú</ViewTitle>
                <Tabs
                    loading={menuLoading}
                    tabsText={['Comidas agregadas al menú']}
                    tabsContent={[<Table data={tableData} />]}
                />

                <ViewTitle>Comidas</ViewTitle>
                <div className="food-cards-container">{
                    foodsLoading ? 
                        <Loader color="blue" size="3" />
                    :
                        foods.map(food => <FoodCard key={food.id} mainClick={this.getMenu} deleteClick={this.getFoods} {...food} />)
                }</div>

            </Layout>
        );
    }
}


export default AddMenu;