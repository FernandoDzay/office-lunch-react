import {Component} from "react";
import Loader from "../Loader/Loader";
import './table.scss';

class Table extends Component {


    render () {
        const {thead, loading} = this.props;

        if(loading) return <Loader withContainer={true} size="2" color="blue" />;
        return (
            <table className="table">
                {
                    thead !== undefined ?
                    <>
                        <thead>
                            <tr>
                                {thead.map((th, index) => <th key={index}>{th}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </>
                    :
                    this.props.children
                }
            </table>
        );
    }

}


export default Table;