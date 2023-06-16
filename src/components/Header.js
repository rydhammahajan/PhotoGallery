import { useContext, useState } from "react";
import Theme from "../context/Theme";
const Header = ()=>{

    const {theme , setTheme} = useContext(Theme) ;
    const [sideBarDisplay , setSideBarDisplay] = useState(false) ; 
 
    window.addEventListener("resize" , ()=>{
        if(window.innerWidth > 765){
            setSideBarDisplay(false) ;
        }
    })

    return (

        <>
        <div id = "header" className={"d-flex  justify-content-between px-md-5 px-3 " + (theme === "light" ? "bg-light" : "dark text-light")} >

            <img src= {require("../assests/gallery.png")} className="logo p-1 pt-3"></img>

            <ul className="header-items d-none d-md-flex gap-5 p-4 fs-6 ">
                <li><i className="fas fa-heart pe-2"></i>My Collection</li>
                <li onClick={()=>{
                    if(theme !== "light") {
                        setTheme("light")
                    }else{
                        setTheme("dark")
                    }
                }}>{theme === "light" ?<i className="fa-regular fa-sun pe-2"></i> : <i className="fa-solid fa-moon pe-2"></i> }Theme</li>
            </ul>

            <i className="fa-solid fa-ellipsis-vertical d-md-none  p-4 mt-2 fs-2" onClick={()=>{
                sideBarDisplay ? setSideBarDisplay(false) : setSideBarDisplay(true) ; 
            }}></i>

        </div>
        {sideBarDisplay && <div className="hamburger d-md-none">
        <ul className={"header-items gap-5 p-4 fs-6 " + (theme === "light" ? "bg-light" : "dark text-light")}>
                <li><i className="fas fa-heart pe-2"></i>My Collection</li>
                <li onClick={()=>{
                    if(theme !== "light") {
                        setTheme("light")
                    }else{
                        setTheme("dark")
                    }
                }}>{theme === "light" ?<i className="fa-regular fa-sun pe-2"></i> : <i className="fa-solid fa-moon pe-2"></i> }Theme</li>
            </ul>
        </div>}
        </>
    )
}

export default Header ; 