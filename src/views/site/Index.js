import Layout from '../layout/Layout';
import ViewTitle from '../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../components/globals/ViewDescription/ViewDescription';
import FoodCard from '../../components/globals/FoodCard/FoodCard';
import Tabs from '../../components/globals/Tabs/Tabs';
import Table from '../../components/globals/Table/Table';
import IconButton from '../../components/globals/IconButton/IconButton';

export default function Index() {

    const tableData = {
        thead: ['Text 1', 'Text 2', 'Text 3', 'Text 3'],
        tbody: [
            ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
            ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
            ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
            ['Text 1', 'Text 2', 'Text 3', <IconButton icon="delete" color="red" />],
        ]
    };

    return(
        <Layout>

            <ViewTitle>Menú</ViewTitle>
            <ViewDescription>Aquí puedes crear una nueva comida.</ViewDescription>

            <div className="food-cards-container">
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </div>

            <Tabs 
                data={{
                    tabsText: ['texto 1', 'texto 2', 'texto 3'],
                    tabsContent: [<Table data={tableData} />, <Table data={tableData} />, <Table data={tableData} />]
                }}
            />
    
        </Layout>
    );
}