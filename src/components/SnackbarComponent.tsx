import Alert from '@mui/material/Alert';
import Grow, { GrowProps } from '@mui/material/Grow';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

const GrowTransition = (props: GrowProps) => {
  return <Grow {...props} />;
};

const SnackbarComponent = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): JSX.Element => {
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
        open={open}
        slots={{ transition: GrowTransition }}
        onClose={onClose}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant="filled">
          <Typography>
            Seems like there was an issue. Please try again.
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackbarComponent;
