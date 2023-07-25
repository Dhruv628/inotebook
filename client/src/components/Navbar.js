import React,{useEffect,useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();


  const [userData, setUserData] = useState({});
  
  

  
  //Get user data from the API
  useEffect(() => {
    if(localStorage.getItem('token')){
      const getUserData = async () => {
        try {
          const response = await fetch(`/api/auth/getuser`, {
            method: "GET", 
          headers: {
              'Content-Type': 'application/json',
              "authToken":localStorage.getItem('token')
    
            },
          });
          if (response.ok) {
            const jsonData = await response.json();    
            setUserData(jsonData)
          } else {
  
          }
        } catch (error) {
  
        }
      };
      getUserData();
    }   
  }, []);
  
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
    setUserData('')
  }
  


   

  return (
    <>
  
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:''}}>
  <div className="container-fluid">
   <h3> <Link className="navbar-brand text-white" to="/" style={{letterSpacing:'1px'}}>iNotebook</Link></h3>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {localStorage.getItem('token')?<li className="nav-item">
          <Link className={`nav-link text-white ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
        </li>:null}
        <li className="nav-item">
          <Link className={`nav-link text-white ${location.pathname==='/about'?'active':''}`} aria-current="page" to="/about">About</Link>
        </li>
        {localStorage.getItem('token')? <li className="nav-item dropdown " style={{zIndex:'0'}}>
          <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-regular fa-user mx-1"></i> Account
          </Link>
          <ul className="dropdown-menu bg-dark" style={{borderRadius:"10px",border:'1px solid white'}}  aria-labelledby="navbarDropdown">
            <li className="dropdown-item" style={{color:'white'}}>{localStorage.getItem('name')}</li>
            <li className="dropdown-item" style={{color:'white',cursor:'default',background:'transparent'}}>{localStorage.getItem('email')}</li>
            {localStorage.getItem('token')?<button className="dropdown-item fw-bolder" style={{color:'white',background:'transparent'}} onClick={handleLogout} type="submit"   ><i className="mx-1 fa-solid fa-right-from-bracket"></i>Log out</button>:null}
         </ul>
        </li>:null}
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex ">
        <Link className="btn btn-info mx-1" to='/login' style={{width:'5.1rem',borderWidth:'2.3px',color:'white',backgroundColor:'transparent'}}>Login</Link>
        <Link className="btn btn-info mx-1" to='/signup' style={{width:'5.1rem',borderWidth:'2.3px',color:'white',backgroundColor:'transparent'}}>Sign up</Link>
      </form>:null}
      
    
     
    </div>
  </div>
</nav>
</>
  )
}
