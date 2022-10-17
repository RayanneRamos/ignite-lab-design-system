import { Meta, StoryObj } from '@storybook/react';
import { Register } from './Register';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';

export default {
  title: 'Pages/Register',
  component: Register,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/register', (req, res, ctx) => {
          return res(ctx.json({
            message: 'Conta criado com sucesso!',
          }));
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'johndoe@example.com');
    userEvent.type(canvas.getByPlaceholderText('*********'), '123456789');
    userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      expect(canvas.getByText('Conta criada com sucesso!')).toBeInTheDocument();
    });
  }
};
