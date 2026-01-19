import { useContext } from "react"
import {DataItem} from "./context/data.jsx"
import {dataContext} from "./context/dataContext"

export default function Output() {
  // Retrieve the pre-rendered list elements from context
  const {AddItemLest} = useContext(DataItem)
  
  return (
    <div className='Output'>
      {/* Table headers for the product list */}
      <div className="itemDetels">
        <p>title</p>
        <p>price</p>
        <p>taxes</p>
        <p>ads</p>
        <p>discount</p>
        <p>total</p>
        <p>category</p>
        <p>update</p>
        <p>delete</p>
      </div>

      {/* Container for displaying all product items */}
      <div className="items">
        {AddItemLest}
      </div>
    </div>
  )
}
