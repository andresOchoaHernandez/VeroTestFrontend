import classes from '../pages/layout/LoginPage.module.css';
import jwt from 'jwt-decode'
import axios from 'axios';

function FormInput(){

    function submit(credentials)
    {
        axios
        .post("http://localhost:8080/token",credentials)
        .then(response => {

            const username = jwt(response.data).sub
            const scope    = jwt(response.data).scope
            const token    = response.data

            localStorage.setItem("token",token);
            localStorage.setItem("username", username);
            localStorage.setItem("scope",scope)

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            
            window.location.href= scope === "STUDENTE"? "/home-studenti" : "/home-docenti";
        })
        .catch(error => {
            if(error.response.status === 401){
                document.getElementById("logErr").innerHTML = "<br>Credenziali non valide<br>";
            }
            else{
                console.log(error);
            }
        });
    }

    return(
        <div className={classes.login} aria-label="finestra di login" tabIndex="4">
            <h2 tabIndex="5">LOGIN</h2>
            <div>
                <form id="loginForm" autoComplete="off" onSubmit={(event) => {event.preventDefault();submit(Object.fromEntries(new FormData(event.target)));}}>
                    <div className={classes.divinput}>
                        <input id="usr" type="text" name="username" placeholder="Unsername" className={classes.input} tabIndex="9" required></input>
                        <br></br>
                        <br></br>
                        <input id="pwd" type="password" name="password" placeholder="Password" className={classes.input} tabIndex="10" required></input>
                        <br></br>
                        <input type="submit" value="ACCEDI"className={classes.btnaccedi} tabIndex="11"></input>
                        <div id="logErr" ></div>
                    </div>
                </form>
            </div>         
        </div>
    )
}

export default FormInput;