import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup = (props) => {
    let navigate = useNavigate();
    
    const [credentials, setCredentials] = useState({name:'',email:'',password:'',cpassword:''})
    
    const onChange=(e)=>{
        setCredentials({
        ...credentials,[e.target.name] : e.target.value
        })
        }

    const handleClick= async(e)=>{
           e.preventDefault() ;
        if(credentials.password!=='' && credentials.password===credentials.cpassword){
            
           const  {name,email,password}=credentials
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST", 
                headers: {
                 "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,password}),
            });
            const json=await response.json()
            console.log(json)
            localStorage.setItem('token',json.authtoken)
            navigate("/login")
        }
        else{
            props.showAlert('Enter correct credentials','danger')
        }      
        
        
    }
   
       
  return (
    <>

    <div className='container'>
    
      <h3 className='mt-3'>Sign Up</h3>
      <h6 className='my-4'>New to iNotebook? Create an account</h6>
    <form className="" onSubmit={handleClick}>
    <div className="my-2">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" placeholder='Username*' name="name" value={credentials.name}  onChange={onChange} />
    </div>
    <div className="my-2">
      <label htmlFor="inputEmail4" className="form-label">Email</label>
      <input type="email" className="form-control" id="email " placeholder='Email*' name="email"  value={credentials.email} onChange={onChange}  />
    </div>
    <div className="my-2">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password " name="password" placeholder='Password*'  minLength={5} required value={credentials.password} onChange={onChange}  />
    </div>
    <div className="my-2">
      <label htmlFor="cpassword" className="form-label">Confirm password</label>
      <input type="password" className="form-control" id="cpassword " name="cpassword"  placeholder='Confirm password*'  minLength={5} required  value={credentials.cpassword} onChange={onChange}/>
    </div>
    <div className="my-2">
      <button type="submit" className="btn btn-info my-3" style={{color:'white'}}>Sign up</button>
    </div>
  </form>
  </div>
  </>
  )
}
