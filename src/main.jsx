import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { InputStyleProvider } from './context/InputStyle.jsx'
import { DataContextProvider } from './context/dataContext.jsx'
import { DataItemProvider } from './context/data.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InputStyleProvider>
    <DataContextProvider>
    <DataItemProvider>
    <App />
    </DataItemProvider>
    </DataContextProvider>
    </InputStyleProvider>
  </StrictMode>,
)
