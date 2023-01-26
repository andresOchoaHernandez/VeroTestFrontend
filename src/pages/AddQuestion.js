import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { endExamCreation } from "../redux/CreateExamSlice"
import { useNavigate } from "react-router-dom"
import { selectCurrentDataTestCreation,selectCurrentOraTestCreation,selectCurrentNomeTestCreation,selectCurrentOrdineCasualeTestCreation,selectCurrentDomandeConNumeroTestCreation} from "../redux/CreateExamSlice"
import { useConnectDomandaToTestMutation, useCreateDomandaMutation, useCreateRispostaMutation, useCreateTestMutation } from "../redux/VeroTestApiExams"

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
    const [error,setError] = useState('');


    const handleSubmit = async(event)=>{
        event.preventDefault();

        try{
            const testCreated = await createTest({data:dataTest,ora:oraTest,nome:nomeTest,ordineCasuale:ordineCasualeTest,domandeConNumero:domandeConNumeroTest}).unwrap();
            
            if(!testCreated?.data?.createTest){
                setError('Non è stato possibile salvare il test')
            }

            for await (const domanda of domandaInput){
                const {nomeDomanda,testoDomanda,puntiDomanda,ordineCasualeDomanda,risposteConNumeroDomanda,risposte} = {...domanda};
                const domandaCreated =  await createDomanda({nome:nomeDomanda,testo:testoDomanda,punti:puntiDomanda,ordineCasuale:ordineCasualeDomanda,risposteConNumero:risposteConNumeroDomanda}).unwrap();

                if(!domandaCreated?.data?.createDomanda){
                    setError('Non è stato possibile salvare la domanda')
                }

                for await(const risposta of risposte){
                    const {testo,punteggio} = {...risposta};
                    const rispostaCreated = await createRisposta({testo:testo,punteggio:punteggio,domanda:nomeDomanda}).unwrap();

                    if(!rispostaCreated?.data?.createRisposta){
                        setError('Non è stato possibile salvare la risposta ')
                    }
                }
                
                const connectedDomandaWithtest = await connectDomandaToTest({domanda:nomeDomanda,dataTest:dataTest,oraTest:oraTest,nomeTest:nomeTest}).unwrap();
            
                if(!connectedDomandaWithtest?.data?.connectDomandaToTest){
                    setError('Non è stato possibile collegare la domanda al test')
                }
            }            
        }
        catch(error){
            setError("È accaduto un errore imprevisto, contattare l'amministratore ")
            console.log(error)
        }

        dispatch(endExamCreation());
        navigate("/home-docenti");
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
                        <div key={domande.nomeDomanda + indexDomande}>
                            <p> ********************* DOMANDA {indexDomande} *********************</p>
                            <label>Nome domanda:</label>
                            <input name="nomeDomanda" type="text" placeholder="Nome domanda" pattern="[a-zA-Z\s]*"  onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
                            <br/>
                            <label>Testo domanda:</label>
                            <input name="testoDomanda" type="text" placeholder="Testo domanda" onChange={(event)=> handleDomandaInput(event,indexDomande)} required/>
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
                                        <div key={risposte.testo + indexRisposte}>
                                            <p>==== RISPOSTA {indexRisposte} =====================================================</p>
                                            <label>Testo risposta:</label>
                                            <input name="testo" type="text" placeholder="Testo risposta" onChange={(event)=> handleRispostaInput(event,indexDomande,indexRisposte)} required/>
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
                <p className={error? "error" : "offscreen"} aria-live="assertive">{error}</p>
                <button onClick={addDomanda} > AGGIUNGI UN'ALTRA DOMANDA </button>
                <br/>
                <button type="submit"> SALVA TEST </button>
            </form>
        </div>
    );
}

export default AddQuestion;