import React, { useState } from "react";
import ReactDOM  from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Body from "./components/Body";
import Theme from "./context/Theme";


const root = ReactDOM.createRoot(document.getElementById("root")) ; 
const AppLayout = ()=> {

    const [theme , setTheme] = useState("dark") ; 
    return (
        <>
        <Theme.Provider value={{theme : theme , setTheme : setTheme}}>
            <Header/>
            <Carousel/>
            <Body/>
        </Theme.Provider>
        </>
        
    )
}

root.render(<AppLayout/>) ; 
