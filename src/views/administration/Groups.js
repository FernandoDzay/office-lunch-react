import ViewTitle from "../../components/globals/ViewTitle/ViewTitle";
import ViewDescription from "../../components/globals/ViewDescription/ViewDescription";
import GroupsTabs from '../../components/views/GroupsTabs/GroupsTabs';
import GroupsSelectors from "./components/GroupsSelectors";


const Groups = () => {


    return (
        <>
            <ViewTitle>Grupos</ViewTitle>
            <ViewDescription>Aquí puedes asignar grupos a usuarios</ViewDescription>

            <GroupsTabs />

            <GroupsSelectors />
        </>
    );
}

export default Groups;