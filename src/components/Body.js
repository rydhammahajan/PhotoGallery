import { useContext, useEffect, useState } from "react";
import { API_KEY } from "../config";
import Shimmer from "./Shimmer";
import {saveAs} from "file-saver";
import Theme from "../context/Theme";

const Body = () =>{

    const [displayImages , setDisplayImages] = useState(null) ; 
    const [page , setPage] = useState(1) ;
    const [filterChoice , setFilterChoice] = useState("") ; 
    const [filterDisplay , setFilterDisplay] = useState(false) ;  
    const filters = ["Nature" , "Moon" , "Plants" , "Animals" , "Monuments" , "Forests" , "Fashion" , "Food" , "Oceans" , "Sky" , "Music" , "Night" , "Desserts" , "Dance" , "Books" , "Wedding" , "Houses" , "Cities"].sort() ; 
    const {theme} = useContext(Theme) ;
   

    async function displayImageFetch(){
        
        setDisplayImages(null)
        let response ; 

        if(filterChoice !== ""){
            response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${filterChoice}&page=${page}`) ; 
        }else{
            response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&page=${page}`) ; 
        }
        const response_json =  await response.json() ;
        setDisplayImages(response_json.hits) ;
        console.log(response_json) ;
    }

    useEffect(()=>{
        displayImageFetch() ; 
         
    }, [page , filterChoice ])

    return (

        <div className={ theme === "light" ? "bg-light" : "dark"}>
            <div className="d-flex justify-content-between  py-4 px-3 px-lg-5 category-container" >
            <span className="fs-1 category-text">Category {filterDisplay ?<i className ="fa-solid fa-angle-down fs-3"
            onClick={()=>{
                setFilterDisplay(false) ; 
            }}
            ></i>:  <i className ="fa-solid fa-angle-up fs-3"
            onClick={()=>{
                setFilterDisplay(true) ; 
            }}
            ></i>}</span>
            
            </div>

            {filterDisplay && <div className="filter-container d-flex flex-wrap justify-content-center gap-5 pb-5 fs-6">
                {
                    filters.map((filter , index)=>{
                        return <button  data-value = {filter} className={"col-4 col-md-3 col-lg-1    filter-button "+(filterChoice === filter ? 'clicked-button' : '')}
                        onClick={(e)=>{
                            setFilterChoice(e.target.dataset.value)
                            setPage(1) ; 
                }} key = {index} >{filter}</button>
                    })
                }
            </div>}


            <div className="displayImages d-flex flex-wrap gap-5 justify-content-center " id = "body">

            {
                displayImages === null && displayImages?.length !== 0  ? <Shimmer/> :  
                
                displayImages?.map((image)=>{
                    return(
                        <div className="position-relative col-10 col-sm-5 col-lg-3 box-shadow image-container" height="300px">
                            <img src= {image.largeImageURL} onMouseOver={(e)=>{
                                e.target.classList.add("scale") ;
                            }} onMouseOut={(e)=>{
                                e.target.classList.remove("scale") ;
                            }} ></img> 
                            <div className="position-absolute fs-5 text-secondary px-2">
                                <i className = "fa-solid fa-arrow-down" onClick = {()=>{
                                    
                                    saveAs(image?.largeImageURL, image.user);
                                }} ></i> 
                            </div>
                            
                        </div>
                        
                    )
                })
            }

            </div>

            <div className="pagination d-flex justify-content-center py-5 gap-3 fs-5">

                <button className="col-4 col-md-3 col-lg-1 border-0" disabled = {page === 1 ? true : false} onClick={()=>{
                    setDisplayImages(null)
                    setPage(page-1) ;      
                    window. scrollTo(0, 0)               
                }}>Prev</button>
                <button className="col-4 col-md-3 col-lg-1 border-0 " disabled = {page === 6 ? true : false } onClick={()=>{
                    setDisplayImages(null)
                    setPage(page+1) ; 
                    window. scrollTo(0, 0) 
                }}>Next</button>

            </div>
        </div>

    )


}

export default Body ; 