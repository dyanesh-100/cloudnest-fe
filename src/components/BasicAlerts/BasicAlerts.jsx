import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';

export default function FloatingAlert({ message, severity, visible }) {
  const [showAlert, setShowAlert] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowAlert(true);

      
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [visible]);

  return (
    <>
      {showAlert && (
        <Stack
          sx={{
            position: 'fixed',
            top: '20px', 
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%',
            zIndex: 9999, // Ensure the alert stays on top
            backgroundColor: severity === 'error' ? '#f44336' : '#4caf50', // Change background color based on severity
            color: '#fff', // Txtl
            
          }}
          spacing={2}
        >
          <Alert severity={severity} variant="filled">{message}</Alert>
        </Stack>
      )}
    </>
  );
}
