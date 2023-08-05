import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";



const Body = () =>{
    const [ListOfRestaurants,setListOfRestaurants] = useState([]);
    const [FilteredListOfRestaurants , setFilteredListOfRestaurants] = useState([]);
    const [SearchBtn, setSearchBtn] = useState("");


    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () =>{
        let data = await fetch ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.3260152&lng=75.57618289999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        let json = await data.json();
        // console.log(json);
        setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        {/*  In order to use the FilteredListOfRestaurants we have to populate it with data too.
          otherwise it will be empty.*/}

        setFilteredListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    // CONDITIONAL RENDERING
    // if(ListOfRestaurants.length === 0){
    //    return <Shimmer/>;
    //     }
    // This same logic is converted to  the below one. It is known as ternary operator.
    
    return ListOfRestaurants.length === 0 ? (<Shimmer/>) : (
        <div className="body-container">

            <input type="text" className="search" value={SearchBtn} onChange={(e)=>{
                setSearchBtn(e.target.value);
            }}></input>
            <button className="submit" onClick={()=>{
                let filteredRestaurants = ListOfRestaurants.filter((res) =>{
                    return (res.info.name.toLowerCase().includes(SearchBtn.toLowerCase()))
                })
                {/* Now instead of updating my orignal ListOfRestaurants, we will update 
                our FilteredListOfRestaurants
                Because if we update the ListOfRestraurants, then if we want to perform one more filter
                It will be performed on the before filtered data
                which is not what we want.
                setListOfRestaurants(filteredRestaurants);*/}
                 

                setFilteredListOfRestaurants(filteredRestaurants);
                
            }}>Submit</button>

            <button className="filter-btn" onClick={() =>{ 
             {/* Here also we need to update FilteredListOfRestaurants

               instead of this let filteredList = ListOfRestaurants.filter(res => res.info.avgRating > 4)*/}
               let filteredList = ListOfRestaurants.filter(res => res.info.avgRating > 4)
                setFilteredListOfRestaurants(filteredList);
            }

               }>Top Rated Restaurants</button>

            

            <div className="res-container">
            {/* Here Again we have to map the FilteredListOfRestaurants
            otherwise there will be no change inflicted in the output */}
            {FilteredListOfRestaurants.map((restaurant)=>{
               return(
               <Link key={restaurant.info.id} to={"restaurant/" +restaurant.info.id }><RestaurantCard  resData = {restaurant}/> </Link>)

            })}  

            </div>
        </div>
    )
};

export default Body;
