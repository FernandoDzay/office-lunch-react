import {Component} from 'react';
import Layout from '../layout/Layout';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodCard from '../../components/globals/FoodCard/FoodCard';
import Loader from '../../components/globals/Loader/Loader';
import Tabs from '../../components/globals/Tabs/Tabs';
import Table from '../../components/globals/Table/Table';
import IconButton from '../../components/globals/IconButton/IconButton';
import {Navigate} from "react-router-dom";

class Index extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            loadingFoods: true,
            loadingExtras: true,
            goLogin: false,
            menuStatus: 0,
            menu: [],
            extras: [],
        }
    }

    componentDidMount() {
        this.getMenu();
        this.getExtras();
    }

    getMenu = () => {
        this.setState({loadingFoods: true});
        fetch(`${this.api_url}/menu/get`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.authError) return this.setState({goLogin: true});
            if(![0, 1, 2].includes(data.status)) throw new Error('Respuesta incorrecta');
            this.setState({loadingFoods: false, menu: data.menu, menuStatus: data.status});
        })
        .catch(e => this.setState({loadingFoods: false}));
    }

    getExtras = () => {
        fetch(`${this.api_url}/extras`, {headers: {Authorization: `bearer ${this.token}`}})
        .then(r => r.json())
        .then(data => {
            if(data.authError) throw new Error('Auth error');
            if(data.error) throw new Error('Respuesta incorrecta');
            this.setState({loadingExtras: false, extras: data});
        })
        .catch(e => this.setState({loadingExtras: false}));
    }

    getViewText = () => {
        const loadingFoodsText = {
            title: 'Cargando menú...',
            description: '...',
        };
        const menuClosed = {
            title: 'Menú',
            description: 'El menú se encuentra cerrado',
        };
        const emptyMenu = {
            title: 'Menú',
            description: 'No hay ninguna comida añadida al menú',
        };
        const menuFound = {
            title: 'Menú',
            description: 'Añade tu comida del día!',
        }

        const {loadingFoods, menuStatus} = this.state;
        const menuTextOptions = [emptyMenu, menuClosed, menuFound]

        const viewText = loadingFoods ? loadingFoodsText :  menuTextOptions[menuStatus];
        return viewText;

    }



    render() {
        const {goLogin, loadingFoods, menu, extras} = this.state;

        const tableData = {
            thead: ['Text 1', 'Text 2', 'Text 3', 'Text 3'],
            tbody: [
                ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
                ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
                ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
                ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
            ]
        };

        const viewText = this.getViewText();
    
        if(goLogin) return <Navigate to={`/login?${new URLSearchParams({error: 'Tu sesión ha expirado'}).toString()}`} />;
        return (
            <>
    
                <ViewTitle>{viewText.title}</ViewTitle>
                <ViewDescription>{viewText.description}</ViewDescription>
                <div className="food-cards-container">{
                    loadingFoods ? 
                        <Loader size="3" color="blue" />
                    :
                        menu.map(item => 
                            <FoodCard 
                                key={item.food.id}
                                id={item.food.id}
                                full_name={item.food.full_name}
                                image={item.food.image}
                            />
                        )
                }</div>

                { extras.length > 0 &&
                    <>
                        <ViewTitle>Extras</ViewTitle>
                        <ViewDescription>Añade un extra si lo deseas.</ViewDescription>
                        <Tabs
                            tabsText={['texto 1', 'texto 2', 'texto 3']}
                            tabsContent={[<Table data={tableData} />, <Table data={tableData} />, <Table data={tableData} />]}
                        />
                    </>
                }
        
            </>
        );
    }
}

export default Index;