import {useEffect} from 'react';
import { getExtras } from '../../../store/slices/extrasSlice';
import ViewTitle from '../../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../../components/globals/ViewDescription/ViewDescription';
import Tabs from '../../../components/globals/Tabs/Tabs';
import ExtraTable from './ExtraTable';
import { useSelector, useDispatch } from 'react-redux';


const ExtrasSection = () => {

    const dispatch = useDispatch();
    const { extras } = useSelector(state => state.extras);

    useEffect(() => {dispatch(getExtras())}, [dispatch]);

    if(extras.length === 0) return null;
    return (
        <>
            <ViewTitle>Extras</ViewTitle>
            <ViewDescription>Añade un extra si lo deseas.</ViewDescription>
            
            <Tabs
                tabsText={['Extras']}
                tabsContent={[<ExtraTable extras={extras} />]}
            />
        </>
    );
}


export default ExtrasSection;