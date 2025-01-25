// GlobalSnackbar.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSnackbar } from '../hook/SnackbarContext';

const GlobalSnackbar = () => {
  const { snackbar, closeSnackbar } = useSnackbar();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled">
        {snackbar.text}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
