import React from "react";
import './table.scss';

class Table extends React.Component {



    render () {
        const {thead, tbody} = this.props.data;

        return (
            <table className="table">
                <thead>
                    <tr>{ thead.map((th, i) => <th key={i}>{th}</th>) }</tr>
                </thead>
                <tbody>
                    { tbody.map((tr, i) => {
                        return <tr key={i}>{ tr.map((td, j) => <td key={j}>{td}</td>) }</tr>
                    }) }
                </tbody>
            </table>
        );
    }

}


export default Table;