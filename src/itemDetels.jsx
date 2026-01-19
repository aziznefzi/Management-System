import React, { useContext } from 'react'
import { DataItem } from './context/data'
import './DeleteDialog/DeleteDialog.css' // Reusing the modal styles

export default function ItemDetels() {
  // Accessing selected item data and modal control
  const { selectedItemDetails, setItemDetailsOpen } = useContext(DataItem)

  // Closes the modal and re-enables background scrolling
  const handleClose = () => {
    setItemDetailsOpen(false)
    document.body.style.overflow = "auto"
  }

  // Prevents the modal from closing when clicking inside the content box
  const stopClick = (e) => {
    e.stopPropagation()
  }

  if (!selectedItemDetails) return null

  return (
    <div onClick={handleClose}
     className='containerDeleteDialog'>
      <div onClick={stopClick}
       className='deleteDialog' style={{ height: 'auto', minHeight: '50%' }}>
        <div className='text'>
          <h6>Item Details</h6>
          {/* Grid layout for displaying detailed item information key-value pairs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            textAlign: 'left',
            marginTop: '20px',
            color: 'white',
            width: '100%'
          }}>
            <p><strong>Title:</strong> {selectedItemDetails.title}</p>
            <p><strong>Category:</strong> {selectedItemDetails.category}</p>
            <p><strong>Price:</strong> {selectedItemDetails.price}</p>
            <p><strong>Taxes:</strong> {selectedItemDetails.taxes}</p>
            <p><strong>Ads:</strong> {selectedItemDetails.ads}</p>
            <p><strong>Discount:</strong> {selectedItemDetails.discount}</p>
            <p><strong>Total:</strong> {selectedItemDetails.total}</p>
            <p><strong>Count:</strong> {selectedItemDetails.count}</p>
          </div>
        </div>
        <div className='Btns' style={{ marginTop: '30px' }}>
          <button onClick={handleClose} className='CanselButton' style={{ width: '100%' }}>Close</button>
        </div>
      </div>
    </div>
  )
}
