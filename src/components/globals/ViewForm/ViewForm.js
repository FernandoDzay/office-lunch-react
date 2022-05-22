import './view-form.scss';
import Loader from '../Loader/Loader';


export default function ViewForm({children, className, loading}) {
    
    
    return (
        <form className={`view-form ${className}`}>
            {loading ? <Loader color="blue" size="2" /> : children}
        </form>
    );
}