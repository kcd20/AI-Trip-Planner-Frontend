import { Button } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import SnackbarComponent from './SnackbarComponent';

const meta: Meta<typeof SnackbarComponent> = {
  title: 'Components/SnackbarComponent',
  component: SnackbarComponent,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SnackbarComponent>;

const Template = (args: {
  description: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Show Snackbar
      </Button>
      <SnackbarComponent {...args} openSnackbar={open} onClose={handleClose} />
    </>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    description: 'This is a success message!',
    severity: 'success',
  },
};
