import './App.css'
import Input from './input'
import Output from './output'
import DeleteAllDialog from './DeleteDialog/DeleteAll.jsx'
import DeleteDialog from './DeleteDialog/DeleteDialog.jsx'
import BasicAlerts from './Allerts.jsx'

import {InputStyle} from './context/InputStyle.jsx'
import {DataItem} from './context/data.jsx'

{/* context Inputs*/}
// Inputs Effect Style
import { useContext } from 'react'
{/* context Inputs*/}
import ItemDetels from './itemDetels.jsx'

import logo from './assets/logo.png'

function App() {
  // Access global states for managing modals and alerts visibility
  const {open, DeleteAllDialogOpen, alertOpen, itemDetailsOpen} = useContext(DataItem) 
  const {setActiveInput} = useContext(InputStyle)
  
  return (
    <div
      onClick={() => {
        // Reset active input state when clicking anywhere outside of an input
        setActiveInput(null)
      }}
      className='App'>
      
      <div className="header">
        <img src={logo} alt="Croud Logo" className="logo" />
      </div>
      
      {/* Input Section: Form for creating and updating products */}
      <Input/>
      
      {/* Output Section: The table displaying all products */}
      <Output/>
      
      {/* Conditional Rendering of Modals and Alerts */}
      {open && <DeleteDialog/>}
      {DeleteAllDialogOpen && <DeleteAllDialog/>}
      {alertOpen && <BasicAlerts/>}
      {itemDetailsOpen && <ItemDetels />}
      
    </div>
  )
}

export default App
