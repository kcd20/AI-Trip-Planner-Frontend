import { Meta, StoryObj } from '@storybook/react';

import ButtonComponent from './ButtonComponent';

const meta: Meta<typeof ButtonComponent> = {
  title: 'Components/ButtonComponent',
  component: ButtonComponent,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['contained', 'outlined'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Contained: Story = {
  args: {
    text: 'Click Me',
    variant: 'contained',
    type: 'button',
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    text: 'Click Me',
    variant: 'outlined',
    type: 'button',
    disabled: false,
  },
};

export const DisabledContained: Story = {
  args: {
    text: 'Disabled',
    variant: 'contained',
    type: 'button',
    disabled: true,
  },
};
