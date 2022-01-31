import LoginForm from "../../components/login/LoginForm";
import LoginLayout from "../layout/LoginLayout";

export default function Register() {

    return (
        <LoginLayout>
            <LoginForm mode="register" />
        </LoginLayout>
    );
}