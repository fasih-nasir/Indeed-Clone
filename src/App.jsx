import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// PAGES

import Company from './pages/company'
import Home from './pages/home'
import Login from './auth/login'
import Create from './auth/create'
import Navbar from './components/navbar'
import Footer from './components/footer'
// PAGES


function App() {
  const [count, setCount] = useState(0)

  return (
<>
<BrowserRouter>
  <Navbar/>
<Routes>
  <Route path='/' element={<Home/>}> </Route>
  <Route path='/company' element={<Company/>}  >  </Route>
  <Route path='/auth/login' element={<Login/>}  >  </Route>
  <Route path='/auth/create' element={<Create/>}  >  </Route>

</Routes>
<Footer/>
</BrowserRouter>
</>
  )
}

export default App
