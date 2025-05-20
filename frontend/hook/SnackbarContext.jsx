// SnackbarContext.jsx
import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    severity: 'info',
  });

  const triggerSnackbar = (text, severity = 'info') => {
    setSnackbar({ open: true, text, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, text: '', severity: 'info' });
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, triggerSnackbar, closeSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
