import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Checkbox, CheckboxProps } from "./Checkbox";
import { Text } from '../Text/Text';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {},
  argTypes: {}, 
  decorators: [
    (Story) => {
      return (
        <div className='flex items-center gap-2'>
          {Story()}
          <Text size='sm'>Lembra-me de mim por 30 dias</Text>
        </div>
      )
    }
  ],
} as Meta<CheckboxProps>

export const Default: StoryObj<CheckboxProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByRole('check'));

    await waitFor(() => {
      expect(canvas.getByText('Lembra-me de mim por 30 dias')).toBeInTheDocument();
      expect(canvas.getByRole('check')).toBeInTheDocument();
      expect(canvas.getByRole('check')).toHaveLength(1);
      expect(canvas.getByRole('CheckboxPrimitive.Root')).toHaveLength(1);
      expect(canvas.getByRole('CheckboxPrimitive.Indicator')).toHaveLength(1);
    });
  }
};
