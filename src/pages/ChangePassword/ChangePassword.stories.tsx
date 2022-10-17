import { Meta, StoryObj } from '@storybook/react';
import { ChangePassword } from './ChangePassword';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';

export default {
  title: 'Pages/ Change password',
  component: ChangePassword,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.put('/changepassword', (req, res, ctx) => {
          return res(ctx.json({
            massage: 'Senha mudada com sucesso!',
          }));
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.type(canvas.getByPlaceholderText('*********'), '123456789');
    userEvent.click(canvas.getByRole('button'));
    
    await waitFor(() => {
      expect(canvas.getByText('Senha mudada com sucesso!')).toBeInTheDocument();
    });
  }
};