import { createContext, useState } from "react";


// Context for handling input values and application status across the app
export const dataContext = createContext(null);

export const DataContextProvider = ({children}) => {
    // DataStatus: 'create' or 'update' to toggle UI modes
    const [DataStatus, setDataStatus] = useState("")
    
    // Shared state for all form inputs
    const [inputValue, setInputValue] = useState({
        title: '',
        price: '',
        taxes: '',
        ads: '',
        discount: '',
        category: '',
        count: '',
    });

    return (
        <dataContext.Provider value={{
            DataStatus,
            setDataStatus,
            inputValue,
            setInputValue
        }}>
            {children}
        </dataContext.Provider>
    )
}
