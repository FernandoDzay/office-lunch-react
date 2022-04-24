import Table from '../../../components/globals/Table/Table';
import IconButton from '../../../components/globals/IconButton/IconButton';


export default function MenuTable({menu, handleDeleteMenu}) {

    const foodsTableData = {
        thead: ['#', 'Nombre', 'Precio', 'Descuento', 'Quitar'],
        tbody:
        menu.map(
            (menu, index) => 
            [
                index + 1,
                menu.food.full_name,
                menu.food.price,
                menu.food.discount,
                <IconButton key={menu.id} loading={menu.loading} onClick={() => handleDeleteMenu(index, menu.id)} icon="delete" color="red" />
            ]
        )
    };

    return <Table data={foodsTableData} />;

}