import classes from '../pages/layout/LoginPage.module.css';
import jwt from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { logout, setCredentials } from '../redux/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useLoginMutation } from '../redux/VeroTestApiAuthentication';

function FormInput(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRef = useRef()
    const errorRef = useRef()
    
    const [username,setUsername]  = useState(''); //dichiariamo variabile username e funzione setUsername che serve per aggiornare la variabile username e che all'inizio voglio che il valore sia ""
    const [password,setPassword]  = useState(''); 
    const [error,setErrorMessage] = useState('');

    const [login, {isLoading}] = useLoginMutation();

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            const token = await login({username,password}).unwrap();

            const scope  = jwt(token).scope.includes("DOCENTE") ? "DOCENTE" : "STUDENTE";
            const userId = jwt(token).userId;

            dispatch(setCredentials({username:username,scope:scope,token:token,userId:userId}));

            navigate(scope === "STUDENTE"? "/home-studenti" : "/home-docenti");
            
        }
        catch(error){

            if(error?.status === "FETCH_ERROR"){
                setErrorMessage("IL SERVER DI AUTENTICAZIONE NON RISPONDE");
            }
            else if(error?.status === 401){
                setErrorMessage("CREDENZIALI NON VALIDE");
            }
            else{
                setErrorMessage("ERRORE LOGIN NON GESTITO, CONTATTARE L'AMMINISTRATORE DEL SITO");
                console.log(error);
            }
            
            dispatch(logout());
            errorRef.current.focus()
        }
    }

    useEffect(() => {userRef.current.focus()},[]);

    useEffect(() => {setErrorMessage('')},[username,password]);

    const handleUsernameInput = (event) => {setUsername(event.target.value)} //qual è il valore che ha triggerato l'azione di setUsername

    const handlePasswordInput = (event) => {setPassword(event.target.value)}

    return(
        isLoading?
        <h1 className={classes.caricamento}> CARICAMENTO... </h1>
        :
        <div className={classes.login} aria-label="finestra di login" tabIndex="4">
            <h2 tabIndex="5">LOGIN</h2>
            <div>
                <form id="loginForm" autoComplete="off" onSubmit={handleSubmit}>
                    <div className={classes.divinput}>
                        <input id="username" type="text" name="username" ref={userRef} value={username} onChange={handleUsernameInput} placeholder="Unsername" className={classes.input} tabIndex="9" required></input>
                        <br></br>
                        <br></br>
                        <input id="pwd" type="password" name="password" value={password} onChange={handlePasswordInput} placeholder="Password" className={classes.input} tabIndex="10" required></input>
                        <br></br>
                        <input type="submit" value="ACCEDI"className={classes.btnaccedi} tabIndex="11"></input>
                        <p ref={errorRef} className={error? "error" : "offscreen"} aria-live="assertive">{error}</p>{/*aria-live="assertive" per dire che l'utente deve poter vedere subito questo messaggio di errore*/}
                    </div>
                </form>
            </div>         
        </div>
    )
}

export default FormInput;