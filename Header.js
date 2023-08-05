import { LOGO_URL } from "./utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; {/* As we wanted to navigate to different pages/components
inside our react app, we had two choices to do.
Earlier, we use an anchor tag <a> and provide a href link to the navigated page. The problem with this is that 
whenever we navigate to other page, it reloads the whole page. Therefore not recommended!!1
Now, we use <Link>. It works same as anchor tags but it is a super powerful component 
given to us by the react-router-dom. It loads the components very smoothly and fastly without 
even reloading the whole page. */}

const Header = () =>{
    const [btnName, setbtnName] = useState("Login");
    console.log("Header rendered");
    /* 
    Case- 1) Whenever useEffect is called without a dependency array, it'll be called everytime our component renders.
    Case- 2) When we give an empty dependency array [], then it will be only called on initial render and only once.
    Case- 3) When we give some value in the dependency array, then it will be called only when the dependency changes.
    For example, [btnName], when we click on login/logout button, btnName changes
    In other words, dependency changes
    As a result, useEffect will be called*/
    useEffect(()=>{
        console.log("Use effect called");
    },[btnName]);
    return(
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL}></img>

            </div>
            <div className="nav-items">
                <ul className="nav">
                    <li> <Link to="/">Home</Link></li>
                    <li> <Link to="/about">About Us</Link></li>
                    <li> <Link to="/contact">Contact Us</Link></li>
                    <li>Cart</li>
                    <button className="login" onClick={()=>{
                        btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
                        
                    }}> {btnName}</button>
                </ul>

            </div>
        </div>
        
    )
};

export default Header;