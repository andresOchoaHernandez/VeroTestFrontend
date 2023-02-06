import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentScope } from "../redux/AuthenticationSlice";
import  classesNavigation from "../pages/layout/NavigationBar.module.css"

function NavigationBar(){

    const scope = useSelector(selectCurrentScope);

    const linkHome = scope.includes("DOCENTE")?"/home-docenti" : "/home-studenti"

    const menuLinks = [
        {
            name: "logout",
            class: "fa-sharp fa-solid fa-right-from-bracket",
            link: "/logout"
        },
        {
            name: "home",
            class: "fa-solid fa-house",
            link: linkHome
        }
    ];

    if (scope.includes("DOCENTE")){
        menuLinks.push({name:"crea esame",class: "fa-solid fa-square-plus",link:"/crea-esame"});
    }

    return (
        <nav className={classesNavigation.navigationBarItems}>
            <h4 className={classesNavigation.menuTitle}> Menu di navigazione </h4>
            <div className={classesNavigation.menuIcon}><i className="fas fa-bars" /></div>
            <ul className={classesNavigation.navigationMenu}>
                {menuLinks.map((input,index) => {
                    return(
                        <li key={input.name + index}>
                            <Link to={input.link} className={classesNavigation.navigationLink}> 
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