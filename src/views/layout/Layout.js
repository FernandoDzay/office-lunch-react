import "../../styles/layout/layout.scss";
import "../../styles/views/view-styles.scss";
import SideBar from './SideBar/SideBar';
import Header from './Header';
import SessionExpired from './SessionExpired';
import MakeOrdersModal from './MakeOrdersModal/MakeOrdersModal';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function Layout() {

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) navigate('/login', {replace: true});
    }, [navigate])

    return (
        <div className="layout" id="layout">
            <div className="left">
                <SideBar />
            </div>
            <div className="right">
                <Header />
                <main className="main">
                    <Outlet />
                </main>
            </div>
            <MakeOrdersModal />
            <SessionExpired />
        </div>
    );
}