import { Button } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import ModalComponent from './ModalComponent';

const meta: Meta<typeof ModalComponent> = {
  title: 'Components/ModalComponent',
  component: ModalComponent,
};

export default meta;

type Story = StoryObj<typeof ModalComponent>;

const Template = (args: { description: string; actionText: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleProceed = () => {
    // eslint-disable-next-line no-alert
    alert('Proceed action triggered!');
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Show Modal
      </Button>
      <ModalComponent
        {...args}
        closeModal={handleClose}
        openModal={open}
        proceedAction={handleProceed}
      />
    </>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    description: 'Are you sure you want to proceed?',
    actionText: 'This action is irreversible.',
  },
};
