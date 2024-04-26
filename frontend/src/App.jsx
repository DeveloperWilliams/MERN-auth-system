import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Sign from './components/Sign'
import Login from './components/Login'
import Home from './components/Home'

const App = () => {
  return (
   <>
     <Routes>
        <Route path='/signup' element={<Sign/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Home/>}></Route>
     </Routes>
   </>
  )
}

export default App