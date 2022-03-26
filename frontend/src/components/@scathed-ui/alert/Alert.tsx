import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState } from 'react';

interface Props extends AlertProps {
  message: string;
}

const Alert: React.FC<Props> = ({ severity, message, variant }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} variant={variant} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
