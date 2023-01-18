import {GraphQLClient,gql} from 'graphql-request'

class api{
    constructor(){
        this.client  = new GraphQLClient("http://localhost:8080/graphql", {headers:{authorization:'Bearer ' + localStorage.getItem("token")}});
    }

    /* QUERIES */
    getAllTests(){
        const query = gql`
            query{
                allTest{
                    data,
                    ora,
                    nome,
                    ordineCasuale,
                    domandeConNumero
                }
            }
            `
        return this.client.request(query).catch((error)=>{console.log(error.message)});
    }

    getTestByDateHourAndName(date,hour,name){console.log("to be implemented")}

    getTestByDateAndName(date,name){console.log("to be implemented")}

    getTestByDate(date){console.log("to be implemented")}

    getTestByName(name){console.log("to be implemented")}

    getAllQuestionsOfTest(date,hour,name){
        const query = gql`
            query allDomandaByTest($data:String!,$hour:String!,$nome:String!){
                allDomandaByTest(data:$data,hour:$hour,nome:$nome){
                    nome,
                    testo,
                    punti,
                    ordineCasuale,
                    risposteConNumero
                }
        }`;
        const vars = {
            data: date,
            hour: hour,
            nome: name
        };
        return this.client.request(query,vars).catch((error)=>{console.log(error.message)});
    }
    
    getQuestionByName(name){console.log("to be implemented")}

    getAllAnswersOfQuestion(questionName){
        const query = gql`
        query allRispostaOfDomanda($domanda:String!){
            allRispostaOfDomanda(domanda:$domanda){
                testo,
                punteggio
            }
        }`;
        const vars = {
            domanda:questionName
        };
        return this.client.request(query,vars).catch((error)=>{console.log(error.message)});
    }

    /* MUTATIONS */ 
    createTest(date,hour,name,casualOrder,numberedQuestions){console.log("to be implemented")}

    createDomanda(name,text,points,casualOrder,numberedAnswers){console.log("to be implemented")}

    createRisposta(text,points,question){console.log("to be implemented")}

    connectDomandaToTest(question,testDate,testHour,testName){console.log("to be implemented")}
}

const VeroTestGraphqlAPI = new api(); 
export {VeroTestGraphqlAPI};