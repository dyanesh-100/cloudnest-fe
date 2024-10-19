import React from 'react'
import SidebarComponent from './components/SidebarComponent/SidebarComponent'
import LoginComponent from './components/LoginComponent/LoginComponent'
import SignUpComponent from './components/SignUpComponent/SignUpComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <React.Fragment>
      <div>
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<LoginComponent/>} />
            <Route path="/signup" element={<SignUpComponent/>} />
            <Route path="/cloudnest/*"  element={<SidebarComponent/>}/>             
          </Routes>
        </BrowserRouter>
      </div>
      
      
    </React.Fragment>
  )
}

export default App