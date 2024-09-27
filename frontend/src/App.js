import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/signup';
import Login from './pages/login';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;



