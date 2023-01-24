import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function CreaEsame(){

    const location = useLocation()

    useEffect(()=> {console.log("HO CAMBIATO PAGINA")},[location]);

    return(
        <div>
            PAGINA PER CREARE GLI ESAMI
        </div>
    );
}

export default CreaEsame;