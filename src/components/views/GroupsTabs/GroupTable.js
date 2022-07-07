import Table from "../../globals/Table/Table";
import Row from "./Row";


const GroupTable = ({is_admin, userGroup}) => {
    const thead = ['#', 'usuario'];
    if(is_admin) thead.push('Quitar del grupo');


    return (
        <Table thead={thead} withEnum={true} >
            {userGroup.relations.map((relation, index) => (
                <Row key={relation.id} is_admin={is_admin} relation={relation} index={index + 1} />
            ))}
        </Table>
    );
}


export default GroupTable;