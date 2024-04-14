import React from "react";
import { NavLink } from "react-router-dom";
import "../Navbar.css";

const Navbar = () => {
 return (
   <header className="header">
     <nav className="nav container">
       <NavLink to="/" className="nav__logo">
       <div className="logo"></div>
       <span class="sr-only">Home</span>
       </NavLink>
       <div
         className={"nav__menu"}
         id="nav-menu"
       >
         <ul className="nav__list">
            <li className="nav__item">
                <NavLink to="/ndia" className="nav__link">
                    NDIA
                </NavLink>
           </li>
           <li className="nav__item">
                <NavLink to="/participants" className="nav__link">
                Participants
                </NavLink>
           </li>
           <li className="nav__item">
             <NavLink
               to="/service-providers"
               className="nav__link"
             >
               ServiceProvidersPage
             </NavLink>
           </li>   
         </ul>
       </div>
     </nav>
   </header>
 );
};

export default Navbar;