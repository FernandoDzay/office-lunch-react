import { Route, Routes } from "react-router-dom";

// ROUTES
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import Index from "../views/site/Index";
import Test from "../views/site/Test";
import AddMenu from "../views/administration/AddMenu";
import CreateFood from "../views/administration/CreateFood";
import EditFood from "../views/administration/EditFood";
import CreateExtra from "../views/administration/CreateExtra";
import EditExtra from "../views/administration/EditExtra";
import Layout from "../views/layout/Layout";


export default function Router() {
    return (
        <Routes>

            {/* LOGIN */}
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />


            <Route element={<Layout />}>
                {/* SITE */}
                <Route path="/" element={ <Index /> } />
                <Route path="/food" element={ <Test /> } />


                {/* ADMINISTRATION */}
                <Route path="/add-menu" element={ <AddMenu /> } />
                <Route path="/create-food" element={ <CreateFood /> } />
                <Route path="/edit-food" element={ <EditFood /> } />
                <Route path="/create-extra" element={ <CreateExtra /> } />
                <Route path="/edit-extra" element={ <EditExtra /> } />
            </Route>

            {/* NOT FOUND */}
            <Route path="*" element={ <h1>Not Found</h1> } />
            
        </Routes>
    );
}