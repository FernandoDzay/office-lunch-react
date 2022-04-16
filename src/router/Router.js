import { Route, Routes } from "react-router-dom";

// ROUTES
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import Index from "../views/site/Index";
import Test from "../views/site/Test";


export default function Router() {
    return (
        <Routes>

            {/* LOGIN */}
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />


            {/* SITE */}
            <Route path="/" element={ <Index /> } />
            <Route path="/food" element={ <Test /> } />


            {/* NOT FOUND */}
            <Route path="*" element={ <h1>Not Found</h1> } />
            
        </Routes>
    );
}