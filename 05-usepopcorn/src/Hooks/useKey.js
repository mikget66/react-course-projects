import { useEffect } from "react";

export function useKey (key, action){
    useEffect(()=>{
        document.addEventListener('keydown', function(e){
          if(e.code.toLowerCase === key.toLowerCase  ){
            action()
          }
        })
        return function(){//cleanup function
          document.removeEventListener('keydown', function(e){
            if(e.code === key  ){
              action()
            }
          })
        }
      },[key, action])
    
}