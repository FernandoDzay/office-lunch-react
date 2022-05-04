import './view-form.scss';


export default function ViewForm({children}) {
    

    return (
        <form className="view-form">
            {children}
        </form>
    );
}