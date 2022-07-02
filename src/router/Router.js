import { Route, Routes } from "react-router-dom";

// ROUTES
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import Index from "../views/site/Index";
import AddMenu from "../views/administration/AddMenu";
import CreateFood from "../views/administration/CreateFood";
import EditFood from "../views/administration/EditFood";
import CreateExtra from "../views/administration/CreateExtra";
import EditExtra from "../views/administration/EditExtra";
import MyOrders from "../views/orders/MyOrders";
import Orders from "../views/orders/Orders";
import WeekOrders from "../views/orders/WeekOrders";
import Payments from "../views/administration/Payments";
import AdminGroups from "../views/administration/Groups";
import Config from "../views/administration/config/Config";
import Pay from "../views/administration/Pay/Pay";
import Users from "../views/administration/Users/Users";
import Groups from "../views/groups/Groups";
import Layout from "../views/layout/Layout";
import RequireAdmin from './roles/RequireAdmin';


export default function Router() {
    return (
        <Routes>

            {/* LOGIN */}
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />


            <Route element={<Layout />}>
                {/* SITE */}
                <Route path="/" element={ <Index /> } />

                {/* ORDERS */}
                <Route path="/my-orders" element={ <MyOrders /> } />
                <Route path="/orders" element={ <Orders /> } />
                <Route path="/week-orders" element={ <WeekOrders /> } />
                <Route path="/groups" element={ <Groups /> } />

                {/* ADMINISTRATION */}
                <Route element={ <RequireAdmin /> }>
                    <Route path="/add-menu" element={ <AddMenu /> } />
                    <Route path="/create-food" element={ <CreateFood /> } />
                    <Route path="/edit-food" element={ <EditFood /> } />
                    <Route path="/create-extra" element={ <CreateExtra /> } />
                    <Route path="/edit-extra" element={ <EditExtra /> } />
                    <Route path="/administration/groups" element={ <AdminGroups /> } />
                    <Route path="/payments" element={ <Payments /> } />
                    <Route path="/pay" element={ <Pay /> } />
                    <Route path="/users" element={ <Users /> } />
                    <Route path="/config" element={ <Config /> } />
                </Route>
            </Route>

            {/* NOT FOUND */}
            <Route path="*" element={ <h1>Not Found</h1> } />
            
        </Routes>
    );
}