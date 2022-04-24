import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import Layout from '../layout/Layout';
import CreateExtraForm from './components/ExtraForm';


export default function CreateExtra(props) {

    return (
        <>
            <ViewTitle>Crear Extra</ViewTitle>
            <ViewDescription>En esta sección puedes crear un nuevo extra</ViewDescription>

            <CreateExtraForm />

        </>
    );

}