import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { DataItem } from './context/data';

export default function BasicAlerts() {
  const {alertCondition, alertMessage} = useContext(DataItem)

  // Map the alert condition to MUI severity levels
  const severityAllert = 
    alertCondition === "create" ? "success" : 
    alertCondition === "update" ? "info" : 
    alertCondition === "warning" ? "warning" : "error"

  // Map the alert message key to a user-friendly string
  const messageAllert = 
    alertMessage === "create" ? "The item has been added successfully" : 
    alertMessage === "update" ? "The item has been modified successfully" : 
    alertMessage === "warning" ? "This item cannot be deleted while in edit mode" : 
    alertMessage === "delete" ? "The item has been deleted" : 
    alertMessage === "deleteAll" ? "All items have been deleted successfully" 
    : null

  return (
    <Stack sx={{ 
        maxWidth: '450px',
        position: 'fixed',
        bottom: '20px',
        left: '100px',
        zIndex: 1000,
    }} spacing={2}>
      <Alert 
        severity={severityAllert}
        sx={{
          // Dynamic styling based on the alert condition for a transparent background effect
          backgroundColor: alertCondition === "create" ? "rgba(46, 125, 50, 0.15)" : 
          alertCondition === "update" ? "rgba(2, 136, 209, 0.15)" : 
          alertCondition === "warning" ? "rgba(237, 108, 2, 0.15)" : "rgba(211, 47, 47, 0.15)",
          color: alertCondition === "create" ? "#2e7d32" : 
          alertCondition === "update" ? "#0288d1" : 
          alertCondition === "warning" ? "#ed6c02" : "#d32f2f",
          fontWeight: 'bold',
          border: '1px solid',
          borderRadius: '8px',
        }}
      >
        {messageAllert}
      </Alert>
    </Stack>
  );
}