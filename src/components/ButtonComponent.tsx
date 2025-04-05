import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface ButtonComponentProps {
  text: string;
  variant: 'contained' | 'outlined';
  onClick: () => void;
  disabled?: boolean;
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  text,
  variant,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      disabled={disabled}
      sx={{ textTransform: 'none', padding: '1rem' }}
      variant={variant}
      onClick={onClick}
    >
      <Typography fontWeight={700}>{text}</Typography>
    </Button>
  );
};

export default ButtonComponent;
