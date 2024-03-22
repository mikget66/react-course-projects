import React from 'react'

function Item({item, handleDelete, toggle}){
    return(
      <li className="">
        <input type="checkbox" value={item.packed} onChange={()=> toggle(item.id)}/>
        <span style={item.packed? {textDecoration : "line-through"} : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => handleDelete(item.id)}>❌</button>
      </li>
      )
  }

export default Item