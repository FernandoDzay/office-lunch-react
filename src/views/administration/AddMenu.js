import {Component} from 'react';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodCard from '../../components/globals/FoodCard/AdminFoodCard';
import {Navigate} from "react-router-dom";
import Loader from '../../components/globals/Loader/Loader';
import Tabs from '../../components/globals/Tabs/Tabs';
import MenuTable from './components/MenuTable';
import ExtrasTable from './components/ExtrasTable';
import {connect} from 'react-redux';
import {getFoods} from '../container/actions';


class AddMenu extends Component {

    componentDidMount() {
        this.props.getFoods();
    }


    render() {
        const {foods, goLogin} = this.props;
        const loadingFoods = foods.length > 0 ? false : this.props.loadingFoods;


        if(goLogin) return <Navigate to={`/login?${new URLSearchParams({error: 'Tu sesión ha expirado'}).toString()}`} />;
        return (
            <>
                <ViewTitle>Agregar al menú</ViewTitle>
                <ViewDescription>En esta sección puedes agregar las comidas disponibles que hayas configurado.</ViewDescription>
                <Tabs
                    tabsText={['Comidas agregadas al menú', 'Extras']}
                    tabsContent={[
                        <MenuTable />,
                        <ExtrasTable />,
                    ]}
                />

                <ViewTitle>Comidas</ViewTitle>
                <div className="food-cards-container">{
                    loadingFoods ? 
                        <Loader color="blue" size="3" />
                    :
                        foods.map(food => <FoodCard key={food.id} mainClick={this.getMenu} deleteClick={this.getFoods} {...food} />)
                }</div>

            </>
        );
    }
}


const mapStateToProps = state => ({
    goLogin: state.viewReducers.goLogin,
    loadingFoods: state.viewReducers.loadingFoods,
    foods: state.viewReducers.foods
});
const mapDispatchToProps = dispatch => ({
    getFoods: () => dispatch(getFoods()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddMenu);