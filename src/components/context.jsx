import React, {useState, createContext} from 'react';
const Context = createContext()


export function AvailableContexts (props){
     const [darkMode, setDarkMode] = useState(false);

     // function toggleDarkMode(){
     //      setDarkMode(!darkMode);
     // }

     const value = {
          darkMode,
          setDarkMode
     }

     return (
          <Context.Provider value={value}>
               {props.children}
          </Context.Provider>
     ) 
}

export default Context;