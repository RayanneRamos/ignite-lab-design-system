import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from "./Button";
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Create account',
  },
  argTypes: {}, 
} as Meta<ButtonProps>

export const Default: StoryObj<ButtonProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      expect(canvas.getAllByRole('button')).toBeInTheDocument();
    });
  },
};
