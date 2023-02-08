import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentScope } from "../redux/AuthenticationSlice";
import classesNav from "../pages/layout/NavigationBar.module.css"
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
        <header className={classesNav.header} tabIndex="0">
            <div>
                <h4> VeroTest </h4>
                <img className={classesNav.logo} src={logoUni} alt="logo università di verona" tabIndex="0"/>
            </div>
            <nav>
                <ul>
                    {/*per ogni elemento di menuLinks vado a creare un elemento <li> ognuno con un <Link> al link di menuLink e come nome quello indicato in menuLink*/}
                    {menuLinks.map((input,index) => { //creo elemento list item che contiene un elemento <Link> per ogni voce della navbar
                        return(
                            <li key={index} tabIndex="0">
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