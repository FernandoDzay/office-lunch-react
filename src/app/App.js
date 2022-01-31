import Router from "../router/Router";
import { BrowserRouter } from "react-router-dom";

import "normalize-scss/sass/normalize/_import-now.scss";
import "../libraries/icons/css/icons.scss";
import "../styles/globals/App.scss";
import "../styles/globals/fonts.scss";


function App() {
    return (
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    );
}

export default App;