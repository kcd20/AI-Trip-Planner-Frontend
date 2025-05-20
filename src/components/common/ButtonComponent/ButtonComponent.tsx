import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

const classes = {
  button: {
    textTransform: 'none',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
  } as CSSProperties,
} as const;

interface ButtonComponentProps {
  text: string;
  variant: 'contained' | 'outlined';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  text,
  variant,
  onClick,
  disabled = false,
  type,
}) => {
  return (
    <Button
      disabled={disabled}
      sx={classes.button}
      type={type}
      variant={variant}
      onClick={onClick}
    >
      <Typography fontWeight={700}>{text}</Typography>
    </Button>
  );
};

export default ButtonComponent;
