import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endExamCreation, setExamCreation } from "../redux/CreateExamSlice";
import classesTest from "./layout/TestPage.module.css"
import classesHome from "./layout/HomePage.module.css"
import NavigationBar from "../components/NavigationBar";

function CreateExam(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const examRef = useRef();

    const [dataTest,setDataTest]                 = useState('');
    const [oraTest,setOraTest]                   = useState('');
    const [nomeTest,setNomeTest]                 = useState('');
    const [ordineCasuale,setOrdineCasuale]       = useState(false);
    const [domandeConNumero,setDomandeConNumero] = useState(false);

    const handleDataInput = (event) =>{setDataTest(event.target.value)};
    const handleOraInput  = (event) =>{setOraTest(event.target.value)};
    const handleNomeInput = (event) =>{setNomeTest(event.target.value)};
    const handleOCInput   = (event) =>{setOrdineCasuale(event.target.checked)};
    const handleDCNInput  = (event) =>{setDomandeConNumero(event.target.checked)};

    useEffect(()=>{examRef.current.focus()},[]);

    dispatch(endExamCreation());

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setExamCreation({dataTest:dataTest,oraTest:oraTest,nomeTest:nomeTest,ordineCasuale:ordineCasuale,domandeConNumero:domandeConNumero}));
        navigate(`/crea-esame/${nomeTest}/aggiungi-domande`)
    }

    return(
        <div className={classesHome.home}>
            <NavigationBar/>
            <h3>PAGINA PER CREARE UN NUOVO ESAME</h3>
            <form className={classesTest.formcreatetest} autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="dataEsame">Data esame : </label>
                <input className={classesTest.newtest} id="dataEsame" type="date" ref={examRef} onChange={handleDataInput} required/>
                <br/>
                <label htmlFor="oraEsame">Ora esame : </label>
                <input className={classesTest.newtest} id="oraEsame" type="time" onChange={handleOraInput} required/>
                <br/>
                <label htmlFor="nomeEsame">Nome esame : </label>
                <input className={classesTest.longinput} id="nomeEsame" type="text" pattern="[a-zA-Z\s]*" onChange={handleNomeInput} placeholder="Nome esame" required/>
                <br/>
                <label htmlFor="ordineCasuale">Voglio che le domande siano mostrate in ordine casuale:</label>
                <input className={classesTest.checkbox} id="ordineCasuale" type="checkbox" onChange={handleOCInput}/>         
                <br/>
                <label htmlFor="domandeConNumero">Voglio che le domande siano numerate:</label>
                <input className={classesTest.checkbox} id="domandeConNumero" type="checkbox" onChange={handleDCNInput}/>
                <br/>
                <button className={classesTest.buttoncrea} type="submit"> CREA TEST </button>
            </form>
        </div>
    );
}

export default CreateExam;