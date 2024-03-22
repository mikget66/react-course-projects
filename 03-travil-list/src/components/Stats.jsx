import React from 'react'

function Stats({items}){
    if(!items.length)
      return(
        <p className="stats">
          <em>
            Srart adding items to packing list 🚀
          </em>
        </p>
      )
  
    const numIems = items.length
    const numPAcked = items.filter((item)=>item.packed).length
    const percentage = Math.round((numPAcked/ numIems)* 100)
  
    return(
      <footer className="stats">
        <em>
        {percentage === 100 ? 'you got everything! ready to go ✈' :
      ` 🧳You have ${numIems} items on your list, and you alredy packed ${numPAcked} (${percentage}%) `
        }
        </em>
      </footer>
    )
  }

export default Stats