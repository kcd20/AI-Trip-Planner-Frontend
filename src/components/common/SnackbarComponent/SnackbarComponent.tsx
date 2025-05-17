import Alert, { AlertColor } from '@mui/material/Alert';
import Grow, { GrowProps } from '@mui/material/Grow';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { FC } from 'react';

const GrowTransition = (props: GrowProps) => {
  return <Grow {...props} />;
};

interface SnackbarComponentProps {
  openSnackbar: boolean;
  description: string;
  severity: AlertColor;
  onClose: () => void;
}

const SnackbarComponent: FC<SnackbarComponentProps> = ({
  openSnackbar,
  description,
  severity,
  onClose,
}): JSX.Element => {
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
        open={openSnackbar}
        slots={{ transition: GrowTransition }}
        onClose={onClose}
      >
        <Alert severity={severity} sx={{ width: '100%' }} variant="filled">
          <Typography>{description}</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackbarComponent;
