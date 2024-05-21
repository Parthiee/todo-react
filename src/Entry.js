import { useEffect, useState } from "react";

export default function Entry(props) {
    const [todo, setTodo] = useState(props.todo);
    const [status, setStatus] = useState(props.status);
    const [editable, setEditable] = useState(false); // State to manage edit mode

    useEffect(()=>
    {
       updateRecord();
    },[status])
    const handleEdit = () => {
        setEditable(!editable); // Toggle edit mode
        updateRecord()
    };

    const handleChange = (event) => {
        setTodo(event.target.value); // Update todo state with the new value from input field
    };

    async function deleteRecord()
    {
        try {
            props.set(true)

            let res = await fetch("http://localhost:5000/delete", {
              method: 'POST',
              headers: {
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify({
                _id: props.id
              })
            });
           
        
            let { message } = await res.json();
        
    
            window.alert(message)
            console.log(message);
            props.set(false)
          } catch (error) {
            console.log(error);
          }
    }

    async function updateRecord()
    {
        try {
            props.set(true)

            let res = await fetch("http://localhost:5000/update", {
              method: 'POST',
              headers: {
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify({
                _id: props.id,
                status: status,
                todo: todo
              })
            });
           
        
            let { message } = await res.json();
        

            console.log(message);
            props.set(false)
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <div style={container}>
            <div style={row}>
                {props.id}
                {status === 0 ? (
                    <div style={editable ? strike : text}>
                        {editable ? (
                            <input
                                type="text"
                                value={todo}
                                onChange={(e) => {handleChange(e)}}
                                style={{ fontSize: 20, color: "black", border: "none", outline: "none" }}
                            />
                        ) : (
                            todo
                        )}
                    </div>
                ) : (
                    <div style={strike}>{todo}</div>
                )}
                <div style={actions}>
                    <input type="checkbox" style={checkbox} checked={status==0 ? false : true} onChange={() => setStatus(status === 1 ? 0 : 1)} />
                 
                    <button style={button} onClick={handleEdit}>
                        {editable ? "Save" : "Edit"} {/* Change button text based on edit mode */}
                    </button>
                    <button style={button} onClick={() => deleteRecord() }>delete</button>
                </div>
            </div>
        </div>
    );
}

const text = {
    fontSize: 20,
    color: "black",
    paddingLeft: 10
};

const strike = {
    fontSize: 20,
    color: "black",
    paddingLeft: 10,
    textDecoration: "line-through"
};

const container = {
    borderWidth: 1,
    borderStyle: "solid",
    width: 800,
    height: 50,
    marginTop: 50,
    color: "gray"
};

const row = {
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
    paddingRight: 10
};

const actions = {
    marginLeft: "auto", // Aligns to the right
    display: "flex", // Allows the buttons and checkbox to be in the same row
    alignItems: "center" // Centers items vertically
};

const checkbox = {
    marginRight: 10,
    height: 20,
    width: 20
};

const button = {
    height: 30,
    marginLeft: 10
};
