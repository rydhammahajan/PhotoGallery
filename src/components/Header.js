import { useContext } from "react";
import Theme from "../context/Theme";
const Header = ()=>{

    const {theme , setTheme} = useContext(Theme) ;
 

    return (
        <div id = "header" className={"d-flex  justify-content-between px-5 " + (theme === "light" ? "bg-light" : "dark text-light")} >

            <img src= {require("../assests/gallery.png")} className="logo p-1 pt-3"></img>

            <ul className="header-items d-none d-md-flex gap-5 p-4 fs-6 ">
                <li><i className="fas fa-heart pe-2"></i>My Collection</li>
                <li onClick={()=>{
                    if(theme === "light") {
                        setTheme("dark")
                    }else{
                        setTheme("light")
                    }
                }}>{theme === "light" ?<i className="fa-regular fa-sun pe-2"></i> : <i className="fa-regular fa-moon pe-2"></i> }Theme</li>
            </ul>


        </div>
    )
}

export default Header ; 