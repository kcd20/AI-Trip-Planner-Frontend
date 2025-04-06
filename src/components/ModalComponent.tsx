import ErrorIcon from '@mui/icons-material/Error';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useAtom, useAtomValue } from 'jotai';
import { CSSProperties, FC } from 'react';

import theme from '../config/theme';
import { modalPropsAtom, openModalAtom } from '../store/atoms';

import ButtonComponent from './ButtonComponent';

const classes = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '70vw',
    },
  } as CSSProperties,
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      gap: '1rem',
    },
  } as CSSProperties,
} as const;

const ModalComponent: FC = () => {
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const modalProps = useAtomValue(modalPropsAtom);
  const { textOne, textTwo, proceedAction } = modalProps;
  return (
    <Modal open={openModal}>
      <Box sx={classes.modal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <ErrorIcon color="warning" sx={{ width: '3rem', height: '3rem' }} />
          <Typography sx={{ color: 'black', textAlign: 'center' }} variant="h6">
            {textOne}
          </Typography>
          <Typography sx={{ color: 'black', textAlign: 'center' }} variant="h6">
            {textTwo}
          </Typography>
        </Box>
        <Box sx={classes.buttons}>
          <ButtonComponent
            text="Cancel"
            variant="outlined"
            onClick={() => setOpenModal(false)}
          />
          <ButtonComponent
            text="Proceed"
            variant="contained"
            onClick={proceedAction}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
