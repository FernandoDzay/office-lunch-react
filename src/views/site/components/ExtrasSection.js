import {useEffect} from 'react';
import { connect } from 'react-redux';
import { getExtras } from '../../container/actions';
import ViewTitle from '../../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../../components/globals/ViewDescription/ViewDescription';
import Tabs from '../../../components/globals/Tabs/Tabs';
import ExtraTable from './ExtraTable';


const ExtrasSection = ({extras, getExtras}) => {
    useEffect(() => {getExtras()}, [getExtras]);

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


const mapStateToProps = state => ({
    loadingExtras: state.viewReducers.loadingExtras,
    extras: state.viewReducers.extras
});
const mapDispatchToProps = dispatch => ({getExtras: () => dispatch(getExtras())});
export default connect(mapStateToProps, mapDispatchToProps)(ExtrasSection);