import "../../styles/layout/layout.scss";
import SideBar from './SideBar/SideBar';
import Header from './Header';
import MakeOrderModal from './MakeOrderModal';
import { Outlet } from 'react-router-dom';


export default function Layout() {

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
            <MakeOrderModal />
        </div>
    );
}