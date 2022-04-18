import "./AuthForm.scss";
import {Link} from 'react-router-dom';
import Button from '../globals/Button/Button';


export default function AuthForm({title, href, linkText, submitText, submitHandler, loading, children}) {

    return (
        <form className="auth-form">
            <i className="zmdi zmdi-account-circle zmdi-hc-5x"></i>
            <p className="title">{title}</p>
            
            {children}

            <Link to={href} className="link">{linkText}</Link>
            <Button color="red" loading={loading} onClick={submitHandler}>{submitText}</Button>
        </form>
    );

}