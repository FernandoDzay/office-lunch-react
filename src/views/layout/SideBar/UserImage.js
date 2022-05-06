import { useState } from "react";
import Modal from "../../../components/globals/Modal/Modal";
import Button from "../../../components/globals/Button/Button";
import FormGroup from "../../../components/globals/Inputs/FormGroup";
import InputFile from "../../../components/globals/Inputs/InputFile";
import {connect} from 'react-redux';
import {getLoggedUser} from '../../../redux/actions/layoutActions';


const UserImage = ({avatar, getUser}) => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            getUser();
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
                avatar ? <img src={ avatar } alt="Avatar" title="Avatar" /> :
                <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
            }</div>
            <Modal active={modal} handleCloseModal={handleCloseModal}>
                <p className="title center mb">Cambia tu Avatar!</p>
                <FormGroup error={errorMessage}>
                    <label id="image">Selecciona tu imagen</label>
                    <InputFile value={file} onChangeHandler={handleChange} />
                </FormGroup>

                <div className="bot">
                    <Button color='blue' onClick={handleSubmit}>Guardar</Button>
                    <Button color='red' onClick={handleCloseModal}>Cancelar</Button>
                </div>
            </Modal>
        </>
    );
}


const mapStateToProps = state => ({avatar: state.layoutReducers.user.image, loading: state.layoutReducers.loadingUser});
const mapDispatchToProps = dispatch => ({getUser: () => dispatch(getLoggedUser())})
export default connect(mapStateToProps, mapDispatchToProps)(UserImage);