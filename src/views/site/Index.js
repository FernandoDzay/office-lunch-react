// import {useEffect} from 'react';
// import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
// import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
// import FoodCard from '../../components/globals/FoodCard/FoodCard';
// import Loader from '../../components/globals/Loader/Loader';
// import {Navigate} from "react-router-dom";
// import {connect} from 'react-redux';
// import {getMenu} from '../container/actions';
// import ExtrasSection from './components/ExtrasSection';

const Index = ({getMenu, menu, loadingMenu, goLogin, menuStatus}) => {

    return <div></div>;

    // useEffect(() => {getMenu()}, [getMenu])

    // const getViewText = () => {
    //     const loadingMenuText = {
    //         title: 'Cargando menú...',
    //         description: '...',
    //     };
    //     const menuClosed = {
    //         title: 'Menú',
    //         description: 'El menú se encuentra cerrado',
    //     };
    //     const emptyMenu = {
    //         title: 'Menú',
    //         description: 'No hay ninguna comida añadida al menú',
    //     };
    //     const menuFound = {
    //         title: 'Menú',
    //         description: 'Añade tu comida del día!',
    //     }

    //     const menuTextOptions = [emptyMenu, menuClosed, menuFound]

    //     const viewText = loadingMenu ? loadingMenuText :  menuTextOptions[menuStatus];
    //     return viewText;

    // }

    // const viewText = getViewText();

    // if(goLogin) return <Navigate to={`/login?${new URLSearchParams({error: 'Tu sesión ha expirado'}).toString()}`} />;
    // return (
    //     <>
    //         <ViewTitle>{viewText.title}</ViewTitle>
    //         <ViewDescription>{viewText.description}</ViewDescription>
    //         <div className="food-cards-container">{
    //             loadingMenu ? 
    //                 <Loader size="3" color="blue" />
    //             :
    //                 menu.map(item => 
    //                     <FoodCard 
    //                         key={item.food.id}
    //                         id={item.food.id}
    //                         full_name={item.food.full_name}
    //                         image={item.food.image}
    //                     />
    //                 )
    //         }</div>

    //         <ExtrasSection />
    //     </>
    // );
}

export default Index;


/* const mapStateToProps = state => ({
    loadingMenu: state.viewReducers.loadingMenu,
    menu: state.viewReducers.menu,
    menuStatus: state.viewReducers.menuStatus,

    goLogin: state.viewReducers.goLogin,
});
const mapDispatchToProps = dispatch => ({
    getMenu: () => dispatch(getMenu())
});
export default connect(mapStateToProps, mapDispatchToProps)(Index); */