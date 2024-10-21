import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Company from './pages/company';
import Home from './pages/home';
import Login from './auth/login';
import Create from './auth/create';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Dash from './auth/dash';
import Contact from './pages/contact';
import Postjob from './pages/postjob';
import Findjob from "./pages/findjob"
import Hireme from "./pages/hireme"
import Jobpost from "./pages/postjob"
import Seek from './pages/seek';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/postjob' element={<Postjob />} />
          <Route path='/findjob' element={<Findjob />} />
          <Route path='/hireme' element={<Hireme />} />
          <Route path='/seekjob' element={<Seek />} />
  
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/create' element={<Create />} />
          <Route path='/auth/dash' element={<Dash />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
