import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentScope } from "../redux/AuthenticationSlice";

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
        <header>
            <h4> Menu di navigazione </h4>
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