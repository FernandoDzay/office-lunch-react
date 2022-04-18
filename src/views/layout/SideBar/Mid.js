import { Component } from "react";

class Mid extends Component {

    constructor(props) {
        super(props);

        this.api_url = process.env.REACT_APP_API_URL;
        this.token = localStorage.getItem('token');

        this.state = {
            username: null,
            avatar: null,
            schedule: 'Horario: ',
            sessionExpired: false,
        }
    }

    componentDidMount() {
        this.getGroup();
        this.getUser();
    }

    getGroup = () => {
        // console.log('getting group from header');
        fetch(`${this.api_url}/groups/get-user-group`, {
            headers: {
                Authorization: `bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(data => {
            if(data.error) this.setState({schedule: 'Tu horario aún no está configurado'});
            if(data.start_time) return this.setState({schedule: `Horario: ${data.start_time}`});
        })
        .catch(e => this.setState({schedule: 'Ocurrió un error al obtener tu horario'}));
    }

    getUser = () => {
        // console.log('getting user from header');
        fetch(`${this.api_url}/users/logged`, {
            headers: {
                Authorization: `bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            if(data.error || !data.id) throw new Error('error!');
            if(data.authError) return this.setState({sessionExpired: true});
            
            this.setState({
                username: data.username,
                avatar: data.image && `${this.api_url}/public/img/users/${data.image}`
            });
        })
        .catch(e => this.setState({username: 'Ocurrió un error al obtener tu nombre'}));
    }

    render() {
        const {schedule, avatar, username} = this.state;

        return (
            <div className="mid">
                { 
                    avatar ? <img src={ avatar } alt="Avatar" title="Avatar" /> :
                    <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
                }
                <p className="name">{ username }</p>
                <p className="schedule">{ schedule }</p>
                <div className="icons">
                    <button>
                        <i className="zmdi zmdi-settings"></i>
                    </button>
                    <button>
                        <i className="zmdi zmdi-power"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Mid;