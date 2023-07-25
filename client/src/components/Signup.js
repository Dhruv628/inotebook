import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';

export const Signup = (props) => {
    let navigate = useNavigate();
    
    const [credentials, setCredentials] = useState({name:'',email:'',password:'',cpassword:''})
    const [eye, seteye] = useState('eye')
    const [passwordType, setpasswordType] = useState("password");
   
    
    const onChange=(e)=>{
        setCredentials({
        ...credentials,[e.target.name] : e.target.value
        })
        }

    const handleClick= async(e)=>{
           e.preventDefault() ;
        if(credentials.password!=='' && credentials.password===credentials.cpassword){
            
           const  {name,email,password}=credentials
         await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST", 
                headers: {
                 "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,password}),
            });
          
            navigate("/login")
            props.showAlert('Account created','success')
        }
        else{
            props.showAlert('Enter correct credentials','danger')
        }      
        
        
    }
   
       
  return (
    <>
     <section className="">
  <div className="container  h-100" >
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 ">

              <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
              <p className="text-white-50 mb-5 ">Please enter your details!</p>
               <form action="" onSubmit={handleClick}>
             {/* Username */}
              <div className="form-outline form-white mb-4">
                <input style={{
      border: '1.5px solid white',
      outline: 'none',
      boxShadow: 'none',
      fontSize:'1rem',
      backgroundColor:'transparent',
    }} type="text" onChange={onChange} id="name" name="name" value={credentials.name} placeholder='Username' className="form-control form-control-lg text-white " />
              </div>
              {/* Email */}
              <div className="form-outline form-white mb-4">
                <input style={{
      border: '1.5px solid white',
      outline: 'none',
      boxShadow: 'none',
      fontSize:'1rem',
      backgroundColor:'transparent',
    }}type="email" id="email " placeholder='Email' name="email"  value={credentials.email} onChange={onChange}  className="form-control form-control-lg text-white " />
              </div>
              {/* Passowd  */}
              <div className="form-outline form-white mb-4" style={{display:'flex',border:'1.5px solid white',alignItems:'center',borderRadius:'4px'}}>
                <input  style={{
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontSize:'1rem',
      backgroundColor:'transparent',
    }}  type={`${passwordType}`} id="password " name="password" placeholder='Password'  minLength={5} required value={credentials.password} onChange={onChange} className="form-control form-control-lg  text-white"/>
                <i onClick={()=>{eye==='eye'?seteye("eye-slash"):seteye("eye")
                 eye==='eye'?setpasswordType("text"):setpasswordType("password")}}
                className={`fa-solid fa-${eye} `} style={{marginRight:'6px'}}></i>
              </div>
              {/* Confirm Passowrd  */}
              <div className="form-outline form-white mb-4" style={{display:'flex',border:'1.5px solid white',alignItems:'center',borderRadius:'4px'}}>
                <input  style={{
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontSize:'1rem',
      backgroundColor:'transparent',
    }}  type={`${passwordType}`} id="cpassword " name="cpassword"  placeholder='Confirm password'  minLength={5} required  value={credentials.cpassword} onChange={onChange} className="form-control form-control-lg  text-white"/>
                <i onClick={()=>{eye==='eye'?seteye("eye-slash"):seteye("eye")
                 eye==='eye'?setpasswordType("text"):setpasswordType("password")}}
                className={`fa-solid fa-${eye} `} style={{marginRight:'6px'}}></i>
              </div>
              <button className="btn btn-outline-light btn-lg px-5" type="submit">Signup</button>
              </form>
            </div>
            <div>
              <p className="mb-0">Already have an account? <Link style={{textDecoration:'none'}} to="/login" className="text-white fw-bold">Login</Link>
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
