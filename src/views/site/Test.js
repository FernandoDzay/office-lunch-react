import {Component} from 'react';
import Layout from '../layout/Layout';

class Test extends Component {

    constructor(props) {
        super(props);

        this.state = {
            full_name: "",
            short_name: null,
            price: "",
            image: ""
        };
    }

    handleFullName = (e) => this.setState({full_name: e.target.value});
    handleShortName = (e) => this.setState({short_name: e.target.value === '' ? null : e.target.value});
    handlePrice = (e) => this.setState({price: e.target.value});
    handleFile = (e) => this.setState({image: e.target.files[0]});
    handleSend = () => {
        const body = new FormData();
        const data = {...this.state};
        Object.entries(data).forEach(([key, value]) => { if(value !== null) body.append(key, value); });

        fetch('http://localhost:3001/foods/create', {
            method: 'post',
            body
        })
        .then(r => r.json())
        .then(r => console.log(r));
    };

    render() {
        return (
            <Layout>
                <div>
                    <label>Full name</label>
                    <input type="text" onChange={this.handleFullName} value={this.state.full_name} /><br /><br /><br />

                    <label>Short name</label>
                    <input type="text" onChange={this.handleShortName} value={this.state.short_name} /><br /><br /><br />

                    <label>Price</label>
                    <input type="text" onChange={this.handlePrice} value={this.state.price} /><br /><br /><br />

                    <label>Image</label>
                    <input type="file" onChange={this.handleFile} /><br /><br /><br />

                    <button onClick={this.handleSend}>Click!!</button>
                </div>
            </Layout>
        );
    }

}


export default Test;