import React, { useReducer, useState } from "react";

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

    
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {
        count: 100,
      });
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
    
        setTimeout(() => {
          setSubmitting(false);
        }, 3000)
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
      
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name of New Group</p>
            <input name="name" />
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
           <input type="number" name="Room Capacity" /*onChange={handleChange}*/ step="1"/>
         </label>
         <label>
           <p>Close Room on Exit if Empty</p>
           <input type="checkbox" name="gift-wrap" onChange={handleChange} />
         </label>
       </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
    }


export default AddGroupForm
