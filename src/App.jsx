import React from 'react'
import SidebarComponent from './components/SidebarComponent/SidebarComponent'
import LoginComponent from './components/LoginComponent/LoginComponent'
import SignUpComponent from './components/SignUpComponent/SignUpComponent'
import GoogleAccountVerification from './components/GoogleAccountVerificationComponent/GoogleAccountVerificationComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <React.Fragment>
      <div>
        <ToastContainer/>
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<LoginComponent/>} />
            <Route path="/signup" element={<SignUpComponent/>} />
            <Route path="/google-account-verification" element={<GoogleAccountVerification/>} />
            <Route path="/cloudnest/*"  element={<SidebarComponent/>}/>             
          </Routes>
        </BrowserRouter>
      </div>
      
      
    </React.Fragment>
  )
}

export default App