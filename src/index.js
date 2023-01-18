import React                          from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM                       from 'react-dom/client';
import { createBrowserHistory }       from 'history';
import './index.css';
import Login from './pages/Login';
import HomeStudenti from './pages/HomeStudenti';
import HomeDocenti from './pages/HomeDocenti';
import ProtectedRoutes from './components/ProtectedRoutes';
import NoPage from './pages/NoPage';
import ExecuteExam from './components/ExecuteExam';

function App()
{
  return(
    <BrowserRouter history={createBrowserHistory()}>
        <Routes>
          <Route path = "/" element = {<Login/>}/>
          <Route path = "*" element = {<NoPage/>}/>

          <Route element ={<ProtectedRoutes allowedScope="STUDENTE"/>}>
            <Route path="/home-studenti" element={<HomeStudenti/>}/>
          </Route>

          <Route element ={<ProtectedRoutes allowedScope="DOCENTE"/>}>
            <Route path="/home-docenti" element={<HomeDocenti/>} />
          </Route>

          <Route element ={<ProtectedRoutes allowedScope="STUDENTE,DOCENTE"/>}></Route>
            <Route path="/esame/:data/:ora/:nome/domanda/:nquestion" element={<ExecuteExam/>}/>
          <Route/>
        
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);