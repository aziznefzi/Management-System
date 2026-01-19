import React, { useContext, useState } from 'react'

{/* context Inputs*/}
// Inputs Effect Style
import {InputStyle} from "./context/InputStyle.jsx" 
// data context
import {dataContext} from "./context/dataContext.jsx"
// data item context
import {DataItem} from "./context/data.jsx"

{/* context Inputs*/}

export default function Input() {
  // Accessing styling and data contexts
  const {activeInput, setActiveInput} = useContext(InputStyle)
  const {inputValue, setInputValue, DataStatus} = useContext(dataContext)
  const {
    AddItemHandle, 
    data, 
    setDeleteAllDialogOpen, 
    searchValue, 
    setSearchValue, 
    searchMode, 
    setSearchMode
  } = useContext(DataItem)

  // Highlights the currently clicked input field
  const inputStyle = (e, id) => {
    e.stopPropagation()
    setActiveInput(id)
  }
  
  // Updates specific input values in the global state
  const InputHandler = (e) => {
    setInputValue({...inputValue, [e.target.name]: e.target.value})
  }

  // Updates the search query as the user types
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  // Switches between search by title or category
  const handleSearchMode = (mode) => {
    setSearchMode(mode)
    setSearchValue("") // Clear search when switching modes
    setActiveInput('search')
  }

  // Opens confirmation dialog for deleting all items
  const deleteAllHandle = () => {
    if(DataStatus === "update") {
      return // Disable during edit mode
    }
    setDeleteAllDialogOpen(true)
    document.body.style.overflow = "hidden";  
  }

  // Automatically calculate the total price based on inputs
  const total = Number(inputValue.price) + Number(inputValue.taxes) + Number(inputValue.ads) - Number(inputValue.discount);

  return (
    <div className="inputs">
      {/* Basic product info inputs */}
      <input 
        className={`input ${activeInput === 'title' ? 'active' : ''}`} 
        name="title"
        value={inputValue.title}
        onChange={InputHandler}
        onClick={(e) => inputStyle(e, 'title')} 
        type="text" 
        placeholder="Title²" 
      />

      <div className='Total-Price'>
        <input 
          className={`input ${activeInput === 'price' ? 'active' : ''}`} 
          name="price"
          value={inputValue.price}
          onChange={InputHandler}
          onClick={(e) => inputStyle(e, 'price')} 
          type="number" 
          placeholder="Price"
        />
        <input 
          className={`input ${activeInput === 'taxes' ? 'active' : ''}`} 
          name="taxes"
          value={inputValue.taxes}
          onChange={InputHandler}
          onClick={(e) => inputStyle(e, 'taxes')} 
          type="number" 
          placeholder="Taxes"
        />
        <input 
          className={`input ${activeInput === 'ads' ? 'active' : ''}`} 
          name="ads"
          value={inputValue.ads}
          onChange={InputHandler}
          onClick={(e) => inputStyle(e, 'ads')} 
          type="number" 
          placeholder="Ads"
        />
        <input 
          className={`input ${activeInput === 'discount' ? 'active' : ''}`} 
          name="discount"
          value={inputValue.discount}
          onChange={InputHandler}
          onClick={(e) => inputStyle(e, 'discount')} 
          type="number" 
          placeholder="Discount"
        />
        {/* Visual feedback for total price calculation */}
        <span
          style={{
            backgroundColor: inputValue.price !== ""  ? 'green' : 'red'
          }}
        >total : {total}</span>
      </div>

       <input 
        name="count"
        value={inputValue.count}
        onChange={InputHandler}
        className={`input ${activeInput === 'count' ? 'active' : ''}`} 
        onClick={(e) => inputStyle(e, 'count')} 
        type="number" 
        placeholder='count' 
      />

      <input
        name="category"
        value={inputValue.category}
        onChange={InputHandler}
        className={`input ${activeInput === 'category' ? 'active' : ''}`} 
        onClick={(e) => inputStyle(e, 'category')} 
        type="text" 
        placeholder='category' 
      />

      {/* Primary Action Button (Add/Update) */}
      <button onClick={AddItemHandle}>
        {DataStatus === "update" ? "Update" : "Create"}
      </button>

      {/* Search and Global Actions (hidden during update) */}
      {DataStatus !== "update" && (
        <>
          {data.length !== 0 && (
            <>
              <input 
                className={`input ${activeInput === 'search' ? 'active' : ''}`} 
                onClick={(e) => inputStyle(e, 'search')} 
                onChange={handleSearchChange}
                value={searchValue}
                type="text" 
                placeholder={`search by ${searchMode}`}
              />
              <div className='search-btn'>
                <button onClick={() => handleSearchMode('title')}>search by title</button>
                <button onClick={() => handleSearchMode('category')}>search by category</button>
              </div>
            </>
          )}

          {data.length > 2 && (
            <button onClick={deleteAllHandle}>delete all</button>
          )}
        </>
      )}
    </div>
  )
}
