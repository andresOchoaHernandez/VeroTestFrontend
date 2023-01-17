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
        this.client.request(query).then(resp => console.log(resp)).catch((error)=>{console.error(error.message)});
    }

    getTestByDateHourAndName(date,hour,name){console.log("to be implemented")}

    getTestByDateAndName(date,name){console.log("to be implemented")}

    getTestByDate(date){console.log("to be implemented")}

    getTestByName(name){console.log("to be implemented")}

    getAllQuestionsOfTest(date,hour,name){console.log("to be implemented")}
    
    getQuestionByName(name){console.log("to be implemented")}

    getAllAnswersOfQuestion(questionName){console.log("to be implemented")}

    /* MUTATIONS */ 
    createTest(date,hour,name,casualOrder,numberedQuestions){console.log("to be implemented")}

    createDomanda(name,text,points,casualOrder,numberedAnswers){console.log("to be implemented")}

    createRisposta(text,points,question){console.log("to be implemented")}

    connectDomandaToTest(question,testDate,testHour,testName){console.log("to be implemented")}
}

const VeroTestGraphqlAPI = new api(); 
export {VeroTestGraphqlAPI};