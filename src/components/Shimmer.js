const Shimmer = ()=>{

    const array = new Array(10).fill(0) ; 

    return (

        array.map((image)=>{
            return(
                <img className="col-10 col-sm-5 col-lg-3 box-shadow shimmer" height="300px"></img> 
            )
        }))
}

export default Shimmer ; 
