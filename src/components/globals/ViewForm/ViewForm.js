import './view-form.scss';


export default function ({children}) {
    

    return (
        <form className="view-form">
            {children}
        </form>
    );
}