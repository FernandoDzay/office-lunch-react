import Loader from "../Loader/Loader";
import './table.scss';

const Table = ({thead, loading, caption, children}) => {

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
                        {children}
                    </tbody>
                </>
                :
                children
            }
            { caption && <caption>{ caption }</caption> }
        </table>
    );

}


export default Table;