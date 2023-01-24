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

    const [domandaInput,setDomandaInput] = useState([{nome:'',testo:'',punti:0.0,ordineCasuale:false,risposteConNumero:false,risposte:[{testo:'',punteggio:0.0}]}]);
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
    };

    const handleDomandaInput = (event,index) => {

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
                            <input name="ordineCasualeDomanda" type="checkbox" onChange={(event)=> handleDomandaInput(event,indexDomande)} />
                            <br/>
                            <label>Voglio che le risposte siano numerate:</label>
                            <input name="risposteConNumeroDomanda" type="checkbox" onChange={(event)=> handleDomandaInput(event,indexDomande)} />
                            <br/>
                            {
                                domandaInput[indexDomande].risposte.map((risposte,indexRisposte)=>{
                                    return (
                                        <div key={indexRisposte}>
                                            <p>==== RISPOSTA {indexRisposte} ====</p>
                                            <label>Testo risposta:</label>
                                            <input type="text" placeholder="Testo risposta" pattern="[a-zA-Z]*" onChange={(event)=> handleDomandaInput(event,indexRisposte)} required/>
                                            <br/>
                                            <label>Punteggio risposta:</label>
                                            <input type="number" min="0.0" max="1.0" step="0.01" onChange={(event)=> handleDomandaInput(event,indexRisposte)} required/>
                                            <br/>
                                            <button> AGGIUNGI UN'ALTRA RISPOSTA </button>
                                            <p>=================</p>
                                        </div>
                                    );
                                })
                            }
                            <p> ******************************************************************</p>
                        </div>
                    );
                })}
                <button> AGGIUNGI UN'ALTRA DOMANDA </button>
                <br/>
                <button type="submit"> SALVA TEST </button>
            </form>
        </div>
    );
}

export default AddQuestion;