import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentScope } from "../redux/AuthenticationSlice";
import navbarClasses from "../pages/layout/NavigationBar.module.css"
import logoUni from '../img/logo.png';

function NavigationBar(){

    const scope = useSelector(selectCurrentScope);

    const linkHome = scope.includes("DOCENTE")?"/home-docenti" : "/home-studenti"

    const menuLinks = [
        {
            name: "logout",
            link: "/logout"
        },
        {
            name: "home",
            link: linkHome
        }
    ];

    if (scope.includes("DOCENTE")){
        menuLinks.push({name:"crea esame",link:"/crea-esame"});
    }

    return (
        <header className={navbarClasses.header}>
            <div>
                <h4> VeroTest </h4>
                <img src={logoUni} alt="logo università di verona" width="60%" tabIndex="1"/>
            </div>
            <nav>
                <ul>
                    {menuLinks.map((input,index) => {
                        return(
                            <li key={index}>
                                <Link to={input.link}> 
                                    {input.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );

}

export default NavigationBar;