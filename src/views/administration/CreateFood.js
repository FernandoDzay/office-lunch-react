import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodForm from './components/FoodForm';


export default function CreateFood(props) {

    return (
        <>
            <ViewTitle>Crear Comida</ViewTitle>
            <ViewDescription>En esta sección puedes crear una nueva comida</ViewDescription>

            <FoodForm />

        </>
    );

}