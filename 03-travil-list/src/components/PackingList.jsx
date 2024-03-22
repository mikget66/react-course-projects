import { useState } from "react"
import Item from "./Item"

function PackingList({items, handleDelete, toggle, handleClear}){
    const[sortBy, setSortBy] = useState('input')
  
    let sorteditems
    if(sortBy === "input") sorteditems = items
    if(sortBy === "description") sorteditems = items.slice().sort((a,b)=> a.description.localeCompare(b.description))
    if(sortBy === "packed status") sorteditems = items.slice().sort((a,b)=> Number(a.packed) - Number(b.packed))
  
    return(
      <div className="list">
      <ul>
        {sorteditems.map((item=>
          <Item item={item} handleDelete={handleDelete} toggle={toggle} key={item.id}/>
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed status">Sort by packed status</option>
        </select>
        <button onClick={handleClear}>Clear list</button>
      </div>
      </div>
    )
  }

export default PackingList