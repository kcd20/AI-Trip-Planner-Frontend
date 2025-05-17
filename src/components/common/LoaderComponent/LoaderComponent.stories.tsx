import { Box, Button } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import LoaderComponent from './LoaderComponent';

const meta: Meta<typeof LoaderComponent> = {
  title: 'Components/LoaderComponent',
  component: LoaderComponent,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['spin', 'watch'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoaderComponent>;

const Template = (args: { variant: 'spin' | 'watch' }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Show Loader (3 seconds)
      </Button>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
        }}
      >
        <LoaderComponent openLoader={open} {...args} />
      </Box>
    </>
  );
};

export const Spinner: Story = {
  render: Template,
  args: {
    variant: 'spin',
  },
};

export const WatchLoader: Story = {
  render: Template,
  args: {
    variant: 'watch',
  },
};
