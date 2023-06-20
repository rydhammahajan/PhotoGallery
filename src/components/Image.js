import { useContext, useState } from "react";
import {saveAs} from "file-saver";
import WishlistContext from "../context/WishlistContext";
const Image = ({image})=>{


    const {list , setList} = useContext(WishlistContext) ; 
    return (
        <div className="position-relative col-10 col-sm-5 col-lg-3 box-shadow image-container" height="300px" key = {image.id}>
            <img src= {image.largeImageURL} onMouseOver={(e)=>{
                e.target.classList.add("scale") ;
            }} onMouseOut={(e)=>{
                e.target.classList.remove("scale") ;
            }} ></img> 
            <div className="position-absolute download fs-5 text-secondary px-2">
                <i className = "fa-solid fa-arrow-down" onClick = {()=>{
                    saveAs(image?.largeImageURL, image.user);
                }} ></i> 
            </div>
            <div className="position-absolute heart fs-5 text-secondary px-2">
                {list[image.id]? <i className = "fa-solid fa-heart" onClick = {()=>{ 
                    setList(prevFilledHeart =>
                        {
                            // prevFilledHeart.filter(img => img !== image)
                            delete prevFilledHeart[image.id] ;
                            
                            localStorage.setItem("list" , JSON.stringify(prevFilledHeart)) ;

                            return {...prevFilledHeart} ; 
                        }
                    );}}></i>  :
                    <i className = "fa-regular fa-heart" onClick = {()=>{
                        setList((prevFilledHeart)=>{
     
                            const obj = {
                                ...prevFilledHeart , 
                                [image.id] : image , 
                            }
                            localStorage.setItem("list" , JSON.stringify(obj)) ;
                            return obj ; 
                        })
                    }} ></i>  
                }
            </div>
            
        </div>
    )
}


export default Image ; 