import React, { Children, useEffect, useState } from "react";
import ReactDOM  from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { createBrowserRouter , Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Body from "./components/Body";
import Theme from "./context/Theme";
import Wishlist from "./components/Wishlist";
import WishlistContext from "./context/WishlistContext";

const root = ReactDOM.createRoot(document.getElementById("root")) ; 
const AppLayout = ()=> {

    const [theme , setTheme] = useState("light") ; 
    const [list , setList] = useState([]) ; 

    useEffect(()=>{
        if(localStorage.getItem("list")) {
            const obj = JSON.parse(localStorage.getItem("list")) ; 
            setList(obj) ; 
        }
    }, [])
    return (
        <>
        <Theme.Provider value={{theme : theme , setTheme : setTheme}}>
        <WishlistContext.Provider value={{list : list , setList : setList}}>
            <Header/>
            <Outlet/>
        </WishlistContext.Provider>
        </Theme.Provider>
        </>
        
    )
}

const WishListLayout = ()=>{
    const [list , setList] = useState([]) ; 
    return (
        <WishlistContext.Provider value={{list : list , setList : setList}}>
            <Wishlist/>
        </WishlistContext.Provider>
    )
}

const AppRouter = createBrowserRouter([
    {
        path : "/" , 
        element : <AppLayout/>,
        children : [
            {
                path : "" , 
                element : <><Carousel/><Body/></>
            },
            {
                path : "/my-collection" , 
                element : <Wishlist/>
            },
        ]
    }
])
root.render(<RouterProvider router={AppRouter}/>) ; 
