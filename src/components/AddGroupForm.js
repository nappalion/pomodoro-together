import React, { useReducer, useState } from "react";

import { database } from "../firebaseConfig.js"
import { ref, child, get, set, push} from "firebase/database";

import { auth } from "../firebaseConfig.js";

import { useNavigate } from 'react-router-dom';

const formReducer = (state, event) => {
    if(event.reset) {
     return {
       apple: '',
       count: 0,
       name: '',
       'gift-wrap': false,
     }
   }
}

const AddGroupForm = () => {
    const navigate = useNavigate();
    
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {
        count: 100,
      });

    const [groupName, setGroupName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [createText, setCreateText] = useState("");

    function handleChangeGroupName(event) {
      setCreateText("");
      setGroupName(event.target.value);
    }
  
    function handleChangeCapacity(event) {
      setCreateText("");
      setCapacity(event.target.value);
    }

    function handleSubmit(groupName, capacity) {
      
      if (groupName != "" && capacity != "") {
        const newGroupRef = push(ref(database, 'groups'));
        const newGroupId = newGroupRef.key;
  
        set(ref(database, 'groups/' + newGroupId + '/name'), groupName);
        set(ref(database, 'groups/' + newGroupId + '/roomCapacity'), capacity);
        set(ref(database, 'groups/' + newGroupId + '/users/' + auth.currentUser.uid), {isRunning: false, timer: 60});
        navigate('/groups');
      }
      else {
        setCreateText("Invalid values.");
      }
      
    }

    const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
          name: event.target.name,
          value: isCheckbox ? event.target.checked : event.target.value,
        })
    }

  return (
    <div className="wrapper">
      <h1>Create a New Study Group</h1>
      <span style={{color: '#1C1C1C', fontSize: 13, marginTop: 5}}>{createText}</span>
      <form>
        <fieldset>
          <label>
            <p>Name of New Group</p>
            <input name="name" value={groupName} onChange={handleChangeGroupName}/>
          </label>
        </fieldset>
        <fieldset>
         <label>
           <p>Room Type</p>
           <select name="Room Type" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="Public">Public</option>
               <option value="Private">Private</option>
           </select>
         </label>
         <label>
           <p>Room Capacity</p>
           <input type="number" name="Room Capacity" value={capacity} onChange={handleChangeCapacity} step="1"/>
         </label>
         <label>
           <p>Close Room on Exit if Empty</p>
           <input type="checkbox" name="gift-wrap" onChange={handleChange} />
         </label>
       </fieldset>
      </form>
      <button onClick={() => handleSubmit(groupName, capacity)}>Submit</button>
    </div>
  )
    }


export default AddGroupForm
