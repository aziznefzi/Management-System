import './DeleteDialog.css'
import { useContext } from 'react'
import { DataItem } from '../context/data';
export default function DeleteAllDialog() {
  const {setDeleteAllDialogOpen, DeleteAllHandle, setAlertOpen} = useContext(DataItem)
  
  // Closes the modal and re-enables background scrolling
  const handleClose = (e) => {
    setDeleteAllDialogOpen(false);
    document.body.style.overflow = "auto";
  };

  // Prevents the modal from closing when clicking inside the dialog box
  const stopClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClose}
      className='containerDeleteDialog'>
      <div onClick={stopClick} className='deleteDialog'>
        <div className='text'>
          <h6>Delete All Dialog</h6>
          <p>Are you sure you want to delete All items?</p>
        </div>
        <div className='Btns'>
          <button 
            onClick={handleClose}
            className='CanselButton'>Cansel</button>
          <button
            onClick={() => {
              setAlertOpen(true)
              DeleteAllHandle()
              handleClose()
            }}
            className='DeleteButton'>Delete All</button>
        </div>
      </div>
    </div>
  )
}
