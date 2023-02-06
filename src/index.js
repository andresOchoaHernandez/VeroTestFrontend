import React                        from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM                       from 'react-dom/client';
import { createBrowserHistory }       from 'history';
import './index.css';
import Login from './pages/Login';
import HomeStudenti from './pages/HomeStudenti';
import HomeDocenti from './pages/HomeDocenti';
import ProtectedRoutes from './components/ProtectedRoutes';
import NoPage from './pages/NoPage';
import ExecuteExam from './pages/ExecuteExam';
import ExamSummary from './pages/ExamSummary';
import { Provider } from 'react-redux';
import { Store, Persistor } from './redux/Store';
import CreateExam from './pages/CreateExam';
import AddQuestion from './pages/AddQuestion';
import { PersistGate } from 'redux-persist/integration/react';
import LogOut from './components/LogOut';

function App()
{
  return(
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <BrowserRouter history={createBrowserHistory()}>
            <Routes>
              <Route path = "/" element = {<Login/>}/>
              <Route path = "*" element = {<NoPage/>}/>
              <Route path = "/logout" element = {<LogOut/>}/>

              <Route element ={<ProtectedRoutes allowedScope="STUDENTE"/>}>
                <Route path="/home-studenti" element={<HomeStudenti/>}/>
              </Route>

              <Route element ={<ProtectedRoutes allowedScope="DOCENTE"/>}>
                <Route path="/home-docenti" element={<HomeDocenti/>} />
                <Route path="/crea-esame" element={<CreateExam/>} />
                <Route path="/crea-esame/:nome/aggiungi-domande" element={<AddQuestion/>}/>
              </Route>

              <Route element ={<ProtectedRoutes allowedScope={"STUDENTE,DOCENTE"}/>}>
                <Route path="/esame/:data/:ora/:nome/:nquestion" element={<ExecuteExam/>}/>
                <Route path="/esame/:data/:ora/:nome/summary" element={<ExamSummary/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);