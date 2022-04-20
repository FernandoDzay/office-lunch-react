import { Component } from "react";
import Modal from "../../../components/globals/Modal/Modal";
import Button from "../../../components/globals/Button/Button";
import FormGroup from "../../../components/globals/Inputs/FormGroup";
import InputFile from "../../../components/globals/Inputs/InputFile";


class UserImage extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            modal: false,
            file: '',
            errorMessage: '',
        }
    }

    handleClick = () => this.setState({modal: true});
    handleCloseModal = () => this.setState({modal: false, file: ''});

    handleChange = (e) => {
        const file = e.target.files[0];
        if(file === undefined) return false;
        this.setState({file});
    }

    handleSubmit = () => {
        const {file} = this.state
        if(file === '') return this.setState({errorMessage: 'Elige una imagen'});
        if( !['image/jpeg', 'image/png'].includes(file.type) ) return this.setState({errorMessage: 'El archivo debe de ser tipo imagen'});

        const body = new FormData();
        body.append('image', file);

        fetch(`${this.api_url}/users/update-logged-user-image`, {
            method: 'PATCH',
            headers: {
                Authorization: `bearer ${this.token}`
            },
            body
        })
        .then(r => r.json())
        .then(data => {
            if(!data.message) throw new Error('No se pudo guardar la imagen');
            this.props.refreshUser();
            this.setState({modal: false, file: ''});
        })
        .catch(e => this.setState({modal: false, file: ''}));
    }


    render() {
        const {modal, file, errorMessage} = this.state;
        const {avatar} = this.props;

        return (
            <>
                <div onClick={this.handleClick}>{
                    avatar ? <img src={ avatar } alt="Avatar" title="Avatar" /> :
                    <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
                }</div>
                <Modal active={modal} handleCloseModal={this.handleCloseModal}>
                    <p className="title center mb">Cambia tu Avatar!</p>
                    <FormGroup error={errorMessage}>
                        <label id="image">Selecciona tu imagen</label>
                        <InputFile value={file} onChangeHandler={this.handleChange} />
                    </FormGroup>

                    <div className="bot">
                        <Button color='blue' onClick={this.handleSubmit}>Guardar</Button>
                        <Button color='red' onClick={this.handleCloseModal}>Cancelar</Button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default UserImage;