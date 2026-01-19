import { createContext, useContext, useEffect, useState } from "react"
import {dataContext} from "./dataContext"
import { v4 as uuidv4 } from 'uuid';


// Context for managing the main data and global state of the application
export const DataItem = createContext()

export const DataItemProvider = ({children}) => {
  // Accessing values from dataContext (shared across inputs)
  const {inputValue, setInputValue} = useContext(dataContext);    
  
  // Initialize data from localStorage or as an empty array
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const {DataStatus, setDataStatus} = useContext(dataContext)
  const [currentItemId, setCurrentItemId] = useState(null)
  const [currentDeleteId, setCurrentDeleteId] = useState(null)
  
  // Modal states
  const [open, setOpen] = useState(false); // Single item delete modal
  const [DeleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false); // Delete all items modal
  
  // Alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertCondition, setAlertCondition] = useState(null); // 'create', 'update', 'delete', 'deleteAll'
  const [alertMessage, setAlertMessage] = useState(null);

  // Opens the delete confirmation dialog for a specific item
  const handleClickOpen = (id) => {
    setCurrentDeleteId(id);
    setOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Persist data to localStorage whenever it changes
  useEffect(() => {
     localStorage.setItem("data", JSON.stringify(data))
  }, [data])
  
  // Auto-close alerts after 3 seconds
  useEffect(() => {
    if(alertOpen) {
      setTimeout(() => {
        setAlertOpen(false)
      }, 3000)
    }
  }, [alertOpen])

  // Handles adding a new item or updating an existing one
  const AddItemHandle = () => {
    if(DataStatus === "update" && currentItemId) {
      // Logic for updating an existing item
      const total = Number(inputValue.price) + Number(inputValue.taxes) + Number(inputValue.ads) - Number(inputValue.discount);
      const updatedData = data.map(item => {
        if(item.id === currentItemId) {
          return {
            ...item,
            title: inputValue.title,
            price: inputValue.price,
            taxes: inputValue.taxes,
            ads: inputValue.ads,
            discount: inputValue.discount,
            total: total,
            category: inputValue.category,
            count: inputValue.count,
          }
        }
        return item;
      })
      setData(updatedData)
      setCurrentItemId(null)
      setDataStatus("create") // Return to default mode
      setAlertCondition("update")
      setAlertMessage("update")
      setAlertOpen(true)
      
      // Smooth scroll back to the updated item
      setTimeout(() => {
        const el = document.getElementById(`item-${currentItemId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
    } else {
      // Logic for adding a new item
      const total = Number(inputValue.price) + Number(inputValue.taxes) + Number(inputValue.ads) - Number(inputValue.discount);
      const newItem = {
        id: uuidv4(),
        title: inputValue.title,
        price: inputValue.price,
        taxes: inputValue.taxes,
        ads: inputValue.ads,
        discount: inputValue.discount,
        total: total,
        category: inputValue.category,
        count: inputValue.count,
      }
      
      // Basic validation: ensure all fields are filled
      if(inputValue.title !== "" &&
         inputValue.price !== "" &&
         inputValue.taxes !== "" &&
         inputValue.ads !== "" &&
         inputValue.discount !== "" &&
         inputValue.category !== "" &&
         inputValue.count !== ""
      ){
        setData([...data, newItem])
        setAlertOpen(true)
        setDataStatus("create") 
        setAlertCondition("create")
        setAlertMessage("create")
      }
    }
    
    // Reset form inputs after successful submission
    if(inputValue.title !== "" &&
        inputValue.price !== "" &&
        inputValue.taxes !== "" &&
        inputValue.ads !== "" &&
        inputValue.discount !== "" &&
        inputValue.category !== "" &&
        inputValue.count !== ""
    ){
        setInputValue({
            title: '',
            price: '',
            taxes: '',
            ads: '',
            discount: '',
            category: '',
            count: '',
        })
    }
  }
    
  // Removes a single item by ID
  const DeleteItemHandle = (id) => {
    setData(data.filter((item) => item.id !== id))
    setDataStatus("create") 
    setAlertCondition("delete")
    setAlertMessage("delete")
    setAlertOpen(true)
  }

  // Deletes all items from the list
  const DeleteAllHandle = () => {
    setData([])
    setDataStatus("create")
    setAlertCondition("deleteAll")
    setAlertMessage("deleteAll")
    setAlertOpen(true)
  }

  // Pre-fills the form with item data for editing
  const UpdateItemHandle = (id) => {
    const itemToUpdate = data.find((item) => item.id === id)
    if(itemToUpdate) {
      setInputValue({
        title: itemToUpdate.title,
        price: itemToUpdate.price,
        taxes: itemToUpdate.taxes,
        ads: itemToUpdate.ads,
        discount: itemToUpdate.discount,
        category: itemToUpdate.category,
        count: itemToUpdate.count,
      })
      setCurrentItemId(id)
      setDataStatus("update")
    }
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Search state and logic
  const [searchValue, setSearchValue] = useState("");
  const [searchMode, setSearchMode] = useState("title");

  // Filtered list based on search query and mode (title/category)
  const filteredData = data.filter((item) => {
    if (searchValue === "") return true;
    if (searchMode === "title") {
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      return item.category.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  // Modal state for viewing full item details
  const [itemDetailsOpen, setItemDetailsOpen] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  const handleItemDetailsOpen = (item) => {
    setSelectedItemDetails(item);
    setItemDetailsOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Rendering the filtered list of items
  const AddItemLest = filteredData.map((item) => {
    return (
      <div className="item" 
         id={`item-${item.id}`}
         onClick={() => handleItemDetailsOpen(item)}
         key={item.id}>
        <p>{item.title}</p>
        <p>{item.price}</p>
        <p>{item.taxes}</p>
        <p>{item.ads}</p>
        <p>{item.discount}</p>
        <p>{item.total}</p>
        <p>{item.category}</p>
        <button onClick={(e) => {
          e.stopPropagation(); // Prevent opening details modal
          UpdateItemHandle(item.id);
        }}>update</button>
        <button onClick={(e) => {
          e.stopPropagation(); // Prevent opening details modal
          DataStatus === "update" ? null : handleClickOpen(item.id);
        }}>delete</button>
      </div>
    )
  })

  // Provider exposes state and functions to the entire application
  return (
    <DataItem.Provider value={{
      open,
      setOpen,
      handleClickOpen,
      data,
      setData,
      AddItemHandle,
      DeleteItemHandle,
      UpdateItemHandle,
      AddItemLest,
      currentItemId,
      currentDeleteId,
      DeleteAllDialogOpen,
      setDeleteAllDialogOpen,
      DeleteAllHandle,
      alertCondition,
      setAlertCondition,
      alertMessage,
      setAlertMessage,
      alertOpen,
      setAlertOpen,
      searchValue,
      setSearchValue,
      searchMode,
      setSearchMode,
      itemDetailsOpen,
      setItemDetailsOpen,
      selectedItemDetails
    }}>
      {children}
    </DataItem.Provider>
  )
}