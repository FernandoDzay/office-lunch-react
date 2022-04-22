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


export default function Router() {
    return (
        <Routes>

            {/* LOGIN */}
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />


            {/* SITE */}
            <Route path="/" element={ <Index /> } />
            <Route path="/food" element={ <Test /> } />


            {/* ADMINISTRATION */}
            <Route path="/add-menu" element={ <AddMenu /> } />
            <Route path="/create-food" element={ <CreateFood /> } />
            <Route path="/edit-food" element={ <EditFood /> } />
            <Route path="/create-extra" element={ <CreateExtra /> } />


            {/* NOT FOUND */}
            <Route path="*" element={ <h1>Not Found</h1> } />
            
        </Routes>
    );
}