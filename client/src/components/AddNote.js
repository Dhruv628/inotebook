import React,{useState,useContext} from 'react'
import noteContext from '../context/note/noteContext'


export const AddNote = (props) => {
    const context = useContext(noteContext)
    const {notes,setNotes}=context
    const host='http://localhost:5000'
  //Function to Add note
  const addNote =async (title, description, tag ) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    let note= await response.json()
    props.showAlert('Note added','success')
    setNotes(notes.concat(note));
  };

    const [note, setNote] = useState({title:'',description:'',tag:''})
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:'',description:'',tag:''})
}

const onChange=(e)=>{
setNote({
    ...note,[e.target.name] : e.target.value
})
}
  return (
    <div className='' style={{margin:'1vh'}}>    
        <h1 className='text-white'>Add a Note</h1>
    <form style={{paddingTop:"1.5rem",paddingBottom:'1.5rem'}} >
  <div className="mb-4">
    <input type="text" style={{backgroundColor:'transparent'}} placeholder="Title" className="form-control text-white" id="title" name='title' aria-describedby="emailHelp" value={note.title}  onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-4">
    <input style={{backgroundColor:'transparent'}} type="text" placeholder="Description"  className="form-control text-white" id="description" name='description'  value={note.description}  onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-4">
    <input style={{backgroundColor:'transparent'}} type="text" placeholder="Tag"  className="form-control text-white" id="tag" name='tag'  value={note.tag}  onChange={onChange}/>
  </div>
  <button disabled={note.title.length<3 } type="submit" className="btn" id='addnotebutton' style={{border:"2px solid white",color:'white',borderRadius:'7px',backgroundColor:"transparent"}} onClick={handleClick}>Add note</button>
</form>
</div>
  )
}
