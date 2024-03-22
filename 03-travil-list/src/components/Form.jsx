import { useState } from "react";

const Form = ({handleAdd}) => {
    const [item, setItem] = useState({
        id : Date.now(),
        description: " ",
        quantity: 1,
        packed: false
      });
    
      function handleSubmit(e){
        e.preventDefault()
    
        handleAdd(item)
        
      }  
    
      return(
        <form className="add-form" onSubmit={handleSubmit}>
          <h3>what do you need for your 😍 trip?</h3>
          <select 
            value={item.quantity}
            onChange={(e)=> setItem({...item, quantity: +e.target.value})}
          >
            {
              Array.from({length: 20}, (_, i)=> i+1).map(num=> (
                <option value={num} key={num}>{num}</option>
            ))}
          </select>
          
    
          <input type="text" placeholder="Item..." value={item.description} onChange={(e)=> setItem({...item, description: e.target.value})}/>
    
          <input type="submit" value="ADD"/>
    
        </form>
      )
}

export default Form