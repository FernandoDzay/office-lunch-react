import ViewTitle from "../../components/globals/ViewTitle/ViewTitle";
import ViewDescription from "../../components/globals/ViewDescription/ViewDescription";
import GroupsTabs from '../../components/views/GroupsTabs/GroupsTabs';


const Groups = () => {


    return (
        <>
            <ViewTitle>Grupos</ViewTitle>
            <ViewDescription>Aquí puedes visualizar a qué grupo pertenecen todos los usuarios</ViewDescription>

            <GroupsTabs is_admin={false} />
        </>
    );
}

export default Groups;