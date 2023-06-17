
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/note/NoteState';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Alert from './components/Alert';
import {useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2000);
}


  return (
    <div style={{ backgroundImage: `url('https://notebook-onthecloud.vercel.app/static/media/bg.f3f682cad15349233b9f.png')`,backgroundRepeat: "no-repeat",backgroundSize: "cover",minHeight: "100vh",    backgroundPosition: 'center' }}>
    <NoteState>
    <Router>
    <Navbar showAlert={showAlert} />
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
          <Route  exact path="/" element={<Home showAlert={showAlert}  />  }   />
          <Route  exact path="/about" element={<About/>  }   />
          <Route  exact path="/login" element={<Login showAlert={showAlert} /> }   />
          <Route  exact path="/signup" element={<Signup showAlert={showAlert}/>  }   />
      </Routes>
      </div>
   </Router>
   </NoteState>
   </div>
  );
}

export default App;
