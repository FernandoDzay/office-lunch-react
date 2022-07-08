import FoodCard from '../../../components/globals/FoodCard/FoodCard';


const ExtrasSection = ({display, menu}) => {

    if(menu.length === 0 || display === false) return null;
    return (
        menu.map(item =>
            <FoodCard 
                key={item.food.id}
                id={item.food.id}
                full_name={item.food.full_name}
                image={item.food.image}
            />
        )
    );
}


export default ExtrasSection;