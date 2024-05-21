import './App.css';
import Entry from './Entry';
import { useEffect, useState } from 'react';
function App() {
const [entries, setEntries] = useState([])
const [todo, setTodo] = useState();
const [fetched, setFetched] = useState(false);

const [ALL, setALL] = useState(false);
const [DONE, setDONE] = useState(false);
const [NOTDONE, setNOTDONE] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      let res = await fetch("http://localhost:5000/getAll", {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      let { message } = await res.json();
      setEntries([...message])
      console.log(message);
      setFetched(false)
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
},[fetched]);


async function addTodo()
{
  try {

    setFetched(false)
    let res = await fetch("http://localhost:5000/add", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        todo: todo,
        status: 0,
        id: 0
      })
    });
   

    let { message } = await res.json();

    if(message === "Added todo")
      {
        setFetched(true)
      }
    window.alert(message)
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

const deleteAll = async () => {
  try {
    setFetched(false)
    let res = await fetch("http://localhost:5000/deleteAll", {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    });

    alert("Deleted All entries");
    setFetched(true)

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div>
      <center>
        <h1>todo</h1>
        
  
        <div style={{ borderWidth: 1, borderStyle: 'solid', width: 800, height: 100, padding: 30, color: 'gray'}}>
          <div>
         <div style={{height: 31, width: 30, backgroundColor: '#48bdbb', position: 'absolute', marginLeft: 90, borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}}/>
          <input style={input} placeholder='New Todo' onChange={(e) => { setTodo(e.target.value)}}/> 
          <br/>
          </div>
          <button style={button} onClick={addTodo}>Add new task</button>
        </div>
      
        <h1>TodoList</h1> 
        <button style={button1} onClick={()=>{setALL(true); setDONE(false); setNOTDONE(false) }}>All</button>
        <button style={button1} onClick={()=>{setALL(false); setDONE(true); setNOTDONE(false) }}>Done</button>
        <button style={button1} onClick={()=>{setALL(false); setDONE(false); setNOTDONE(true) }}>Todo</button>
       
    
      {
       ALL && entries.map((state) => {
          return <Entry todo= {state.todo} status={state.status} id= {state._id} set={setFetched} /> 
      })  
      
      }

{
       DONE && entries.map((state) => {
        if (state.status == 1)
         { return <Entry todo= {state.todo} status={state.status} id= {state._id} set={setFetched} /> }
      })  
      
 }
 {
       NOTDONE && entries.map((state) => {
        if (state.status == 0 )
         { return <Entry todo= {state.todo} status={state.status} id= {state._id} set={setFetched} /> }
      })  
      
      }

<div style={{marginTop: 100}}>
      <button className="delete-button" onClick={() => {deleteAll()}}>Delete All</button>
      <button className="delete-button" onClick={() => {}}>Delete Checked</button>
    </div>
     
     </center>
    </div>
  );
}

const input = {
  width: 552,
  height: 30,
  paddingLeft: 60,
}

const button = {
 
  width: 620,
  height: 40, // Increased height for better visibility and touch target
  marginTop: 10,
  fontSize: 20,
  backgroundColor: '#48bdbb',
  borderWidth: 1,
  borderRadius: 5, // Increased border radius for a rounded appearance
  borderStyle: 'solid',
  color: 'white',
  cursor: 'pointer', // Cursor changes to pointer on hover for better UX
  
}

const button1 = {
  width: 200,
  height: 40, // Increased height for better visibility and touch target
  marginTop: 10,
  marginRight: 10, // Adjusted margin for better spacing between buttons
  fontSize: 20,
  backgroundColor: '#48bdbb',
  borderWidth: 1,
  borderRadius: 5, // Increased border radius for a rounded appearance
  color: 'white',
  cursor: 'pointer', // Cursor changes to pointer on hover for better UX
}


export default App;
