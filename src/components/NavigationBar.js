import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentScope } from "../redux/AuthenticationSlice";

function NavigationBar(){

    const scope = useSelector(selectCurrentScope);

    const linkHome = scope.includes("DOCENTE")?"/home-docenti" : "/home-studenti"

    const menuLinks = [
        {
            name: "home",
            class: "fa-solid fa-house",
            link: linkHome
        },
        {
            name: "logout",
            class: "fa-sharp fa-solid fa-right-from-bracket",
            link: "/logout"
        }
    ];

    if (scope.includes("DOCENTE")){
        menuLinks.push({name:"crea esame",class: "fa-solid fa-square-plus",link:"/crea-esame"});
    }

    return (
        <nav>
            <h4> Menu di navigazione </h4>
            <ul>
                {menuLinks.map((input,index) => {
                    return(
                        <li key={input.name + index}>
                            <Link to={input.link}> 
                                {input.name}
                                <i className={input.class}/>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );

}

export default NavigationBar;