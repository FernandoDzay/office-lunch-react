import Table from '../../../components/globals/Table/Table';
import TableRow from './TableRow';


export default function ExtraTable({extras}) {

    return (
        <Table thead={['#', 'Nombre', 'Precio', 'Agregar']} caption="Extras" responsive={true}>
            {extras.map((extra, index) => <TableRow key={extra.id} extra={extra} index={index + 1} />)}
        </Table>
    );
}