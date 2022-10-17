import { Meta, StoryObj } from '@storybook/react';
import { ForgotPassword } from './ForgotPassword';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';

export default {
  title: 'Pages/Forgot password',
  component: ForgotPassword,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/forgotpassword', (req, res, ctx) => {
          return res(ctx.json({
            message: 'Link enviado com sucesso!',
          }));
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.type(canvas.getByPlaceholderText('Digite seu email cadastrado'), 'johndoe@example.com');
    userEvent.type(canvas.getByPlaceholderText('*********'), '123456789');

    await waitFor(() => {
      expect(canvas.getByText('Link enviado com sucesso!')).toBeInTheDocument();
    });
  }
};