import ViewTitle from '../../../components/globals/ViewTitle/ViewTitle';
import ViewDescription from '../../../components/globals/ViewDescription/ViewDescription';
import Switch from '../../../components/globals/Switch/Switch';
import API from '../../../class/API';
import { useEffect, useState } from 'react';
import Loader from '../../../components/globals/Loader/Loader';
import FormGroup from '../../../components/globals/Inputs/FormGroup';
import Input from '../../../components/globals/Inputs/Input';
import './config.scss';
import Button from '../../../components/globals/Button/Button';


const Config = () => {
    const [loading, setLoading] = useState(true);
    const [discountLoading, setDiscountLoading] = useState(false);
    const [discountError, setDiscountError] = useState('');
    const [settings, setSettings] = useState(null);
    const [discount, setDiscount] = useState(0);


    useEffect(() => {
        setLoading(true);
        API('GET', '/settings/get')
        .then(response => {
            setSettings(response.data);
            setDiscount(response.data.discount_price.int_value);
        })
        .catch(error => {})
        .finally(r => setLoading(false));
    }, []);

    const handleMenuClick = (e, active) => {
        API('PUT', '/settings/update', {
            id: settings.menu_open.id,
            setting: "menu_open",
            int_value: active ? 1 : 0
        });
    }

    const handleGroupsClick = (e, active) => {
        API('PUT', '/settings/update', {
            id: settings.groups_rotate.id,
            setting: "groups_rotate",
            int_value: active ? 1 : 0
        });
    }

    const handleDiscountClick = e => {
        e.preventDefault();
        if(discount.length === 0) return setDiscountError('El descuento no puede estar vacío');

        setDiscountLoading(true);
        setDiscountError('');
        API('PUT', '/settings/update', {
            id: settings.discount_price.id,
            setting: "discount_price",
            int_value: discount
        })
        .then(r => {})
        .catch(r => setDiscountError('Ocurrió un error al cambiar el descuento'))
        .finally(r => setDiscountLoading(false));
    }

    const handleChange = (e) => {
        if(isNaN(e.target.value) || e.nativeEvent.data === '.') return;
        setDiscount(e.target.value);
    }


    if(loading) return <Loader color="blue" size="3" />
    if(!settings) {
        return (
            <>
                <ViewTitle>Configuración</ViewTitle>
                <ViewDescription>Ocurrió un error, no se puede mostrar ninguna configuración</ViewDescription>
            </>
        );
    }
    return (
        <>
            <ViewTitle>Configuración</ViewTitle>
            <ViewDescription>En esta sección puedes configurar partes de la aplicación</ViewDescription>

            <hr />

            <div className="switch-container">
                <ViewDescription>Activar o desactivar el menú</ViewDescription>
                <Switch onClick={handleMenuClick} active={settings.menu_open.int_value} />
            </div>

            <div className="switch-container">
                <ViewDescription>¿Permitir la rotación de grupos diariamente?</ViewDescription>
                <Switch onClick={handleGroupsClick} active={settings.groups_rotate.int_value} />
            </div>

            <form className='config-form'>
                <ViewDescription>Escribe el descuento deseado</ViewDescription>
                <FormGroup message="Escribe el descuento" forceNotEmpty={true} error={discountError} >
                    <label>Descuento</label>
                    <Input value={discount} onChangeHandler={handleChange} />
                </FormGroup>
                <Button color="blue" loading={discountLoading} onClick={handleDiscountClick}>Cambiar descuento</Button>
            </form>
        </>
    );
}


export default Config;