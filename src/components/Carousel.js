import { useEffect, useState } from "react";
import { API_KEY } from "../config";

const Carousel = () => {

    const [carouselImages , setCarouselImages] = useState(null) ; 


    async function carouselImageFetch(){

        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=landscape`) ; 
        const response_json =  await response.json() ;
        setCarouselImages(response_json.hits) ; 
    }

    useEffect(()=>{
        carouselImageFetch() ;
    } , [])

    function HandleCarousel(e) {

        const images = document.querySelectorAll(".carousel img");
        const container = document.querySelector(".carousel") ;
        if(e.target.dataset.direction === "right"){
            const first = images[0] ; 
            container.removeChild(first) ; 
            container.appendChild(first) ;

            for(let i=0 ; i<images.length ; i++) {
                if(images[i] === first) {
                    first.classList.add("left-slide")  ;
                    first.classList.remove("right-slide")
                }else{
                    images[i].classList.remove("left-slide") ; 
                    images[i].classList.remove("right-slide") ; 
                }
            }


        }else{
            const last = images[images.length-2] ;

            for(let i=0 ; i<images.length ; i++) {
                if(images[i] === last) {
                    last.classList.add("right-slide")  ;
                    last.classList.remove("left-slide")  ;
                }else{
                    images[i].classList.remove("left-slide") ; 
                    images[i].classList.remove("right-slide") ; 
                }
            }
            setTimeout(()=>{
                 const node = images[images.length-1] ; 
                container.removeChild(node) ;
                images[0].insertAdjacentElement("beforebegin" , node) ; 
            } , 500)               
          
        }

    }

    return (
        <div className="carousel position-relative ">

            <i className = "fa-solid fa-chevron-left controls fs-1 text-secondary" data-direction = "left" 
            onClick = {(e)=>{
                HandleCarousel(e);
            }}
            ></i>
            <i className = "fa-solid fa-chevron-right controls fs-1 text-secondary" data-direction = "right"
            onClick = {(e)=>{
                HandleCarousel(e);
            }}
            ></i>
            {
                carouselImages && carouselImages.map((image)=>{
                    return(
                        <img src= {image.largeImageURL} className="col-12"></img>
                    )
                })
            }

        </div>
    )
    

}

export default Carousel ; 
