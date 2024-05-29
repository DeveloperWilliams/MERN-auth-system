import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Sign from './components/Sign'
import Login from './components/Login'
import Home from './components/Home'
import Forgot from './components/Forgot'
import Notfound from './components/Notfound'
import Reset from './components/Reset'

const App = () => {
  return (
   <>
     <Routes>
        <Route path='/signup' element={<Sign/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home/:id' element={<Home/>}></Route>
        <Route path='/reset/:id' element={<Reset/>}></Route>
        <Route path='/forgot' element={<Forgot/>}></Route>
        <Route path='/reset' element={<Reset/>}></Route>
        <Route path='/*' element={<Notfound/>}></Route>
     </Routes>
   </>
  )
}

export default App