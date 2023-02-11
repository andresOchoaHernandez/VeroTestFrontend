import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentScope } from "../redux/AuthenticationSlice";
import classesNav from "../pages/layout/NavigationBar.module.css"
import logoUniSolo from '../img/logo_solo2.png';


function NavigationBar(){

    const scope = useSelector(selectCurrentScope);

    const linkHome = scope.includes("DOCENTE")?"/home-docenti" : "/home-studenti"

    //link del menu
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
        <header aria-label="barra di navigazione" className={classesNav.header} tabIndex="0">
            <div>
                <h4 tabIndex="0"> VeroTest </h4>
                <img className={classesNav.logo} src={logoUniSolo} alt="logo università di verona" tabIndex="0"/>
            </div>
            <nav tabIndex="0">
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