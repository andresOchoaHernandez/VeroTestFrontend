import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { endExamCreation } from "../redux/CreateExamSlice"
import { useNavigate } from "react-router-dom"
import { selectCurrentDataTestCreation,selectCurrentOraTestCreation,selectCurrentNomeTestCreation,selectCurrentOrdineCasualeTestCreation,selectCurrentDomandeConNumeroTestCreation} from "../redux/CreateExamSlice"
import { useConnectDomandaToTestMutation, useCreateDomandaMutation, useCreateRispostaMutation, useCreateTestMutation } from "../redux/VeroTestApiExams"
import classesTest from "./layout/TestPage.module.css"
import classesHome from "./layout/HomePage.module.css"
import NavigationBar from "../components/NavigationBar"

function AddQuestion(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createTest = useCreateTestMutation()[0]
    const createDomanda = useCreateDomandaMutation()[0]
    const createRisposta = useCreateRispostaMutation()[0]
    const connectDomandaToTest = useConnectDomandaToTestMutation()[0]
    
    const dataTest = useSelector(selectCurrentDataTestCreation)
    const oraTest = useSelector(selectCurrentOraTestCreation)  
    const nomeTest = useSelector(selectCurrentNomeTestCreation)  
    const ordineCasualeTest = useSelector(selectCurrentOrdineCasualeTestCreation)
    const domandeConNumeroTest = useSelector(selectCurrentDomandeConNumeroTestCreation)

    const [domandaInput,setDomandaInput] = useState([{nomeDomanda:'',testoDomanda:'',puntiDomanda:0.0,ordineCasualeDomanda:false,risposteConNumeroDomanda:false,risposte:[{testo:'',punteggio:0.0},{testo:'',punteggio:0.0}]}]);

    const validateInput = () => {
        
        if(domandaInput.length < 1) {
            alert("Deve essere fornita almeno una domanda per creare il test");
            return false;
        }

        for(const domanda of domandaInput){
            if(domanda.risposte.length < 2){
                alert("Ogni domanda deve avere almeno due risposte")
                return false;
            }
            
            /* CHECK FOR AT LEAST ONE CORRECT ANSWER (1.0 POINTS) */
            let correctAnswer = [];

            for(const risposta of domanda.risposte){
                if(parseFloat(risposta.punteggio) === 1.0){
                    correctAnswer.push(risposta);
                }
            }

            if(correctAnswer.length !== 1){
                alert("Bisogna inserire una ed una sola risposta giusta (punteggio 1.0) per ogni domanda")
                return false;
            }
        }

        return true;
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        if (!validateInput()){
            return;
        }

        try{
            const {data:{createTest:testCreated}} = await createTest({data:dataTest,ora:oraTest,nome:nomeTest,ordineCasuale:ordineCasualeTest,domandeConNumero:domandeConNumeroTest}).unwrap();
            
            if(!testCreated){
                alert('Non è stato possibile salvare il test')
            }

            for await (const domanda of domandaInput){
                const {nomeDomanda,testoDomanda,puntiDomanda,ordineCasualeDomanda,risposteConNumeroDomanda,risposte} = {...domanda};
                const {data:{createDomanda:domandaCreated}} =  await createDomanda({nome:nomeDomanda,testo:testoDomanda,punti:puntiDomanda,ordineCasuale:ordineCasualeDomanda,risposteConNumero:risposteConNumeroDomanda}).unwrap();

                if(!domandaCreated){
                    alert('Non è stato possibile salvare la domanda')
                }

                for await(const risposta of risposte){
                    const {testo,punteggio} = {...risposta};
                    const {data:{createRisposta:rispostaCreated}} = await createRisposta({testo:testo,punteggio:punteggio,domanda:nomeDomanda}).unwrap();

                    if(!rispostaCreated){
                        alert('Non è stato possibile salvare la risposta ')
                    }
                }
                
                const {data:{connectDomandaToTest:connectedDomandaWithtest}} = await connectDomandaToTest({domanda:nomeDomanda,dataTest:dataTest,oraTest:oraTest,nomeTest:nomeTest}).unwrap();
            
                if(!connectedDomandaWithtest){
                    alert('Non è stato possibile collegare la domanda al test')
                }
            }            
        }
        catch(error){
            alert("È accaduto un errore imprevisto, contattare l'amministratore ")
            console.log(error)
        }

        dispatch(endExamCreation());
        navigate("/home-docenti");
    };

    const handleDomandaInput = (event,index,isCheckBox=false) => {
        const formData = [...domandaInput];
        if(isCheckBox){
            formData[index][event.target.name] = event.target.checked; //settiamo se vogliamo domanda con risposte numerate o in ordine casuale      
        }
        else{
            formData[index][event.target.name] = event.target.value; //settiamo (ad esempio) nome domanda con il value che ha triggerato l'evento di handleDomandaInput
        }
        setDomandaInput(formData);
    }

    const handleRispostaInput = (event,indexDomanda,indexRisposta) => {
        const formData = [...domandaInput];
        const updatedRisposte = [...formData[indexDomanda].risposte];
        updatedRisposte[indexRisposta][event.target.name] = event.target.value;
        formData[indexDomanda].risposte = updatedRisposte;
        setDomandaInput(formData);
    }

    const addDomanda  = () => {
        let newDomanda = {nomeDomanda:'',testoDomanda:'',puntiDomanda:0.0,ordineCasualeDomanda:false,risposteConNumeroDomanda:false,risposte:[{testo:'',punteggio:0.0},{testo:'',punteggio:0.0}]};
        setDomandaInput([...domandaInput,newDomanda]);
    };
    const addRisposta = (index) => {
        let newRisposta = {testo:'',punteggio:0.0};
        const formData = [...domandaInput];
        formData[index].risposte.push(newRisposta);
        setDomandaInput(formData);
    };

    const removeQuestion = (indexDomanda) => {
        const formData = [...domandaInput];
        formData.splice(indexDomanda,1);
        setDomandaInput(formData);
    }

    const removeAnswer = (indexDomanda,indexRisposta) => {
        const formData = [...domandaInput];
        formData[indexDomanda].risposte.splice(indexRisposta,1);
        setDomandaInput(formData);
    }

    return (
        <div className={classesHome.home}>
            <NavigationBar/>
            <h3>PAGINA PER LA CREAZIONE DEL TEST</h3>
            <form autoComplete="off" onSubmit={handleSubmit}>
                {domandaInput.map((domande,indexDomande)=>{
                    return(
                        <div key={indexDomande}>
                            <h4>DOMANDA {indexDomande}</h4>
                            <label>Nome domanda:</label>
                            <input className={classesTest.longinput} name="nomeDomanda" type="text" placeholder="Nome domanda" pattern="[\w\s\d?.,]*"  onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
                            <br/>
                            <label>Testo domanda:</label>
                            <input className={classesTest.longinput} name="testoDomanda" type="text" placeholder="Testo domanda" onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
                            <br/>
                            <label>Punti domanda:</label>
                            <input className={classesTest.middleinput} name="puntiDomanda" type="number" min="1.0" step="0.01"  onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
                            <br/>
                            <label>Voglio che le risposte a questa domanda siano mostrate in ordine casuale:</label>
                            <input name="ordineCasualeDomanda" type="checkbox" onChange={(event)=> handleDomandaInput(event,indexDomande,true)} />
                            <br/>
                            <label>Voglio che le risposte siano numerate:</label>
                            <input name="risposteConNumeroDomanda" type="checkbox" onChange={(event)=> handleDomandaInput(event,indexDomande,true)} />
                            <br/>
                            {
                                domandaInput[indexDomande].risposte.map((risposte,indexRisposte)=>{
                                    return (
                                        <div key={indexRisposte}>
                                            <h4>RISPOSTA {indexRisposte}</h4>
                                            <label>Testo risposta:</label>
                                            <input className={classesTest.longinput} name="testo" type="text" placeholder="Testo risposta" onChange={(event)=> handleRispostaInput(event,indexDomande,indexRisposte)} required/>
                                            <br/>
                                            <label>Punteggio risposta:</label>
                                            <input className={classesTest.middleinput} name="punteggio" type="number" min="0.0" max="1.0" step="0.01" onChange={(event)=> handleRispostaInput(event,indexDomande,indexRisposte)} required/>
                                            <br/>
                                            {indexRisposte > 1 ?<button className={classesTest.buttonmanagequestion} onClick={()=>removeAnswer(indexDomande,indexRisposte)} >RIMUOVI RISPOSTA</button>:null}
                                            {domandaInput[indexDomande].risposte.length-1 === indexRisposte?<button className={classesTest.buttonmanagequestion} onClick={() => addRisposta(indexDomande)}>AGGIUNGI RISPOSTA</button>:null}
                                        </div>
                                    );
                                })
                            }
                            {indexDomande > 0 ? <button className={classesTest.buttonmanagequestion} onClick={()=>removeQuestion(indexDomande)}>RIMUOVI DOMANDA</button>:null}
                            <hr></hr>
                        </div>
                    );
                })}
                <button className={classesTest.buttonmanagequestion} onClick={addDomanda} > AGGIUNGI UN'ALTRA DOMANDA </button>
                <br/>
                <button className={classesTest.buttonmanagequestion} type="submit"> SALVA TEST </button>
            </form>
        </div>
    );
}

export default AddQuestion;