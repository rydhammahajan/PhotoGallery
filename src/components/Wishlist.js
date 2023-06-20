import { useContext } from "react";
import WishlistContext from "../context/WishlistContext";
import Theme from "../context/Theme";
import Image from "./Image";
const Wishlist = ()=>{

    const {list , setList} = useContext(WishlistContext) ; 
    const {theme} = useContext(Theme) ; 

    const tempList = Object.values(list) ; 

    return(
        <div className= {theme === "light" ? "bg-light" : "bg-dark " }>

            <h1 className= "category-text text-center p-5 ">My Wishlist</h1>

            {tempList.length > 0 ? <div className= "displayImages d-flex flex-wrap gap-5 justify-content-center " id = "body">

                {
                    
                    tempList?.map((image)=>{
                        return <Image image = {image}/>
                    })
                }

            </div> : <div className="text-center fs-5 text-secondary ">
                <i className="fa-solid fa-box-open fs-1"></i><br/>
                Wishlist Empty 
            </div>}
        </div>
    )
}

export default Wishlist ; 
