import Loader from "../Loader/Loader";
import './table.scss';

const Table = ({thead, loading, caption, responsive, withEnum, maxSize, children}) => {
    const classNames = ['table-container'];
    if(responsive) classNames.push('responsive');
    if(withEnum) classNames.push('with-enum');
    if(maxSize) classNames.push(`max-size-${maxSize}`);

    if(loading) return <Loader withContainer={true} size="2" color="blue" />;
    return (
        <div className={classNames.join(' ')}>
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
        </div>
    );

}


export default Table;