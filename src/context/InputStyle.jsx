import { createContext, useState } from "react";

export const InputStyle = createContext();

export const InputStyleProvider = ({children}) => {
   const [activeInput, setActiveInput] = useState(null);
    return (
        <InputStyle.Provider value={{activeInput, setActiveInput}}>
            {children}
        </InputStyle.Provider>
    )
}