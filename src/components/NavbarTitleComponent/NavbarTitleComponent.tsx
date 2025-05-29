import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic/useNavbarComponentLogic';

const classes = {
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  } as CSSProperties,
  icon: { padding: '1rem' } as CSSProperties,
} as const;

const NavbarTitleComponent: FC = () => {
  const { onClickLandingPage } = useNavbarComponentLogic();
  return (
    <Box
      data-testid="NavbarTitleComponent"
      sx={classes.root}
      onClick={onClickLandingPage}
    >
      <AirplanemodeActiveIcon sx={classes.icon} />

      <Typography component="div" variant="h6" onClick={onClickLandingPage}>
        AI Japan Trip Planner
      </Typography>
    </Box>
  );
};

export default NavbarTitleComponent;
