import { useState } from "react"
//import { useSelector } from "react-redux"
//import { selectCurrentDataTestCreation,selectCurrentOraTestCreation,selectCurrentNomeTestCreation,selectCurrentOrdineCasualeTestCreation,selectCurrentDomandeConNumeroTestCreation,selectCurrentDomandeTestCreation} from "../redux/CreateExamSlice"

function AddQuestion(){
    
    //const dataTest = useSelector(selectCurrentDataTestCreation)
    //const oraTest = useSelector(selectCurrentOraTestCreation)  
    //const nomeTest = useSelector(selectCurrentNomeTestCreation)  
    //const ordineCasualeTest = useSelector(selectCurrentOrdineCasualeTestCreation)
    //const domandeConNumeroTest = useSelector(selectCurrentDomandeConNumeroTestCreation)
    //const domandeTest = useSelector(selectCurrentDomandeTestCreation)

    const [domandaInput,setDomandaInput] = useState([{nomeDomanda:'',testoDomanda:'',puntiDomanda:0.0,ordineCasualeDomanda:false,risposteConNumeroDomanda:false,risposte:[{testo:'',punteggio:0.0},{testo:'',punteggio:0.0}]}]);
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
    };

    const handleDomandaInput = (event,index,isCheckBox=false) => {
        const formData = [...domandaInput];

        if(isCheckBox){
            formData[index][event.target.name] = event.target.checked;    
        }
        else{
            formData[index][event.target.name] = event.target.value;
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
        <div>
            PAGINA PER L'AGGIUNTA DI DOMANDE
            <form autoComplete="off" onSubmit={handleSubmit}>
                {domandaInput.map((domande,indexDomande)=>{
                    return(
                        <div key={indexDomande}>
                            <p> ********************* DOMANDA {indexDomande} *********************</p>
                            <label>Nome domanda:</label>
                            <input name="nomeDomanda" type="text" placeholder="Nome domanda" pattern="[a-zA-Z]*"  onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
                            <br/>
                            <label>Testo domanda:</label>
                            <input name="testoDomanda" type="text" placeholder="Testo domanda" pattern="[a-zA-Z]*"  onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
                            <br/>
                            <label>Punti domanda:</label>
                            <input name="puntiDomanda" type="number" min="0.0" step="0.01"  onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
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
                                            <p>==== RISPOSTA {indexRisposte} =====================================================</p>
                                            <label>Testo risposta:</label>
                                            <input name="testo" type="text" placeholder="Testo risposta" pattern="[a-zA-Z]*" onChange={(event)=> handleRispostaInput(event,indexDomande,indexRisposte)} required/>
                                            <br/>
                                            <label>Punteggio risposta:</label>
                                            <input name="punteggio" type="number" min="0.0" max="1.0" step="0.01" onChange={(event)=> handleRispostaInput(event,indexDomande,indexRisposte)} required/>
                                            <br/>
                                            {indexRisposte > 1 ?<button onClick={()=>removeAnswer(indexDomande,indexRisposte)} >RIMUOVI RISPOSTA</button>:null}
                                            <p>=====================================================================================</p>
                                            {domandaInput[indexDomande].risposte.length-1 === indexRisposte?<button onClick={() => addRisposta(indexDomande)}>AGGIUNGI RISPOSTA</button>:null}
                                        </div>
                                    );
                                })
                            }
                            {indexDomande > 0 ? <button onClick={()=>removeQuestion(indexDomande)}>RIMUOVI DOMANDA</button>:null}
                            <p> ******************************************************************</p>
                        </div>
                    );
                })}
                <button onClick={addDomanda} > AGGIUNGI UN'ALTRA DOMANDA </button>
                <br/>
                <button type="submit"> SALVA TEST </button>
            </form>
        </div>
    );
}

export default AddQuestion;