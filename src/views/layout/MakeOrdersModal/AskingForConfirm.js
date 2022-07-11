import Button from '../../../components/globals/Button/Button';


const AskingForConfirm = ({setConfirm, handleCloseModal}) => {

    return (
        <>
            <p className="title center">Confirmar crear órdenes</p>
            <p className="description center bold">¿Estás seguro que deseas continuar?</p>
            <br />
            <p className="description center mb-30">Al presionar continuar, se crearán las órdenes del día de hoy, y se cerrará el menú</p>
            <br />
            <div className="bot">
                <Button color="blue" icon="cutlery" adjustIcon={true} onClick={setConfirm}>Continuar</Button>
                <Button color="red" icon="close-circle" adjustIcon={true} onClick={handleCloseModal}>Cancelar</Button>
            </div>
        </>
    );
}


export default AskingForConfirm;