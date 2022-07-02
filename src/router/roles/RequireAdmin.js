import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


const RequireAdmin = () => {
    const { user: {is_admin}, loadingUser } = useSelector(state => state.layout);
    const navigate = useNavigate();

    useEffect(() => {
        if(is_admin === undefined) return;
        if(loadingUser) return;
        if(!is_admin) navigate('/', {replace: true});
    }, [is_admin, loadingUser, navigate]);

    return (
        <Outlet />
    );
}


export default RequireAdmin;