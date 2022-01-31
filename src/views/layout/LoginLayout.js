import "../../styles/layout/login-layout.scss";

export default function LoginLayout(props) {

    return (
        <div className="login-layout">
            { props.children }
        </div>
    );
}