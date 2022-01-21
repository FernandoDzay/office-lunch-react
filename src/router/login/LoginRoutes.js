import { Routes, Route } from "react-router-dom";
import Login from "../../views/login/Login";
import Register from "../../views/login/Register";


export default function LoginRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}