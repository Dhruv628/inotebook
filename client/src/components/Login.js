
import React,{useState} from 'react'
import {useNavigate,Link } from 'react-router-dom'



export const  Login =  (props) => {
 

    let navigate = useNavigate();
 const [credentials, setCredentials] = useState({email:'',password:''})
 const [eye, seteye] = useState('eye')
 const [passwordType, setpasswordType] = useState("password")


    const handleClick= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
             "Content-Type": "application/json",
              },
              body: JSON.stringify({email:credentials.email, password:credentials.password}),
            });
            const json=await response.json()
         
            if(json.success){
                // Save the token and redirect
                localStorage.setItem('token',json.authtoken)
                props.showAlert('Logged in successfully','success','block')
                navigate("/")
            }
            else{
                props.showAlert('Incorrect Credentials','danger','block')
            }
        
            if(localStorage.getItem('token')){
         
               
                  const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                    method: "GET", 
                  headers: {
                      'Content-Type': 'application/json',
                      "authToken":localStorage.getItem('token')
                    },
                  });
                  if (response.ok) {
                   const jsonData = await response.json();   
                   localStorage.setItem('name',jsonData.name)
                   localStorage.setItem('email',jsonData.email)
               
                  } else {
                 
                  }
                }

    }
    const onChange=(e)=>{
        setCredentials({
        ...credentials,[e.target.name] : e.target.value
        })
        }


  return (
    <>
    <section className="">
  <div className="container  h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5 ">Please enter your email and password!</p>
               <form action="" onSubmit={handleClick}>
              <div className="form-outline form-white mb-4">
                <input style={{
      border: '1.5px solid white',
      outline: 'none',
      boxShadow: 'none',
      fontSize:'1rem',
      backgroundColor:'transparent',
    }} type="email" id="typeEmailX" onChange={onChange} name='email' value={credentials.email} placeholder='Email' className="form-control form-control-lg text-white " />
              </div>

              <div className="form-outline form-white mb-4" style={{display:'flex',border:'1.5px solid white',alignItems:'center',borderRadius:'4px'}}>
                <input type={`${passwordType}`}  style={{
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontSize:'1rem',
      backgroundColor:'transparent',
    }} id="typePasswordX"  placeholder="Password" name="password" onChange={onChange} value={credentials.password}  className="form-control form-control-lg  text-white"/>
                <i onClick={()=>{eye==='eye'?seteye("eye-slash"):seteye("eye")
                 eye==='eye'?setpasswordType("text"):setpasswordType("password")}}
                className={`fa-solid fa-${eye} `} style={{marginRight:'6px'}}></i>
              </div>
              <button className="btn btn-outline-light btn-lg px-5 mt-4" type="submit">Login</button>
              </form>
            </div>
            <div>
              <p className="mb-0">Don't have an account? <Link style={{textDecoration:'none'}} to="/signup" className="text-white fw-bold">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
