import { useState } from "react";
import Modal from "../../../components/globals/Modal/Modal";
import Button from "../../../components/globals/Button/Button";
import FormGroup from "../../../components/globals/Inputs/FormGroup";
import InputFile from "../../../components/globals/Inputs/InputFile";
import { getLoggedUser } from '../../../store/slices/layoutSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";


const UserImage = () => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [avatar, setAvatar] = useState('');

    const { image } = useSelector(state => state.layout.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setAvatar(image);
    }, [image])

    const handleClick = () => setModal(true);
    const handleCloseModal = () => {
        setModal(false);
        setFile('');
    }

    const handleChange = (e) => {
        const inputFile = e.target.files[0];
        if(inputFile === undefined) return false;
        setFile(inputFile);
    }

    const handleSubmit = () => {
        if(file === '') setErrorMessage('Elige una imagen');
        if( !['image/jpeg', 'image/png'].includes(file.type) ) return setErrorMessage('El archivo debe de ser tipo imagen');

        const body = new FormData();
        body.append('image', file);

        fetch(`${api_url}/users/update-logged-user-image`, {
            method: 'PATCH',
            headers: {Authorization: `bearer ${token}`},
            body
        })
        .then(r => r.json())
        .then(data => {
            if(!data.message) throw new Error('No se pudo guardar la imagen');
            dispatch(getLoggedUser());
            setModal(false);
            setFile('');
        })
        .catch(e => {
            setModal(false);
            setFile('');
        });
    }


    return (
        <>
            <div onClick={handleClick}>{
                avatar ? <img src={ avatar } alt="Avatar" title="Avatar" onError={() => setAvatar(null)} /> :
                <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
            }</div>
            <Modal active={modal} handleCloseModal={handleCloseModal}>
                <p className="title center mb">Cambia tu Avatar!</p>
                <FormGroup error={errorMessage}>
                    <label id="image">Selecciona tu imagen</label>
                    <InputFile value={file} onChangeHandler={handleChange} />
                </FormGroup>

                <div className="bot">
                    <Button color='blue' icon="save" adjustIcon={true} onClick={handleSubmit}>Guardar</Button>
                    <Button color='red' icon="close-circle" adjustIcon={true} onClick={handleCloseModal}>Cancelar</Button>
                </div>
            </Modal>
        </>
    );
}


export default UserImage;