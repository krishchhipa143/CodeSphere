import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import WelcomePage from './Pages/WelcomPage'
import SignUp from './Components/SignUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Pages/HomePage'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
    <>
  <ToastContainer position="bottom-right" autoClose={3000} />
</>

    </>
  )
}

export default App
