import { FormEvent, useState } from 'react';
import axios from 'axios';
import { Envelope } from "phosphor-react";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";
import { Logo } from "../../components/Logo/Logo";
import { Text } from "../../components/Text/Text";
import { TextInput } from "../../components/TextInput/TextInput";

function ForgotPassword() {
  const [ isUserForgotPassword, setIsUserForgotPassword ] = useState(false);

  async function handleForgotPassword(event: FormEvent) {
    event.preventDefault();

    await axios.post('/forgotpassword', {
      email: 'rayanneramos@gmail.com',
    });

    setIsUserForgotPassword(true);
  }

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center text-gray-100 flex-col">
      <header className="flex flex-col items-center">
        <Logo />
        <Heading size="lg" className="mt-4">
          Ignite Lab
        </Heading>
        <Text size="lg" className="text-gray-400">
          Esqueceu sua senha
        </Text>
      </header>
      <form onSubmit={handleForgotPassword} className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-4">
        { isUserForgotPassword && <Text>Link enviado com sucesso.</Text> }
        <label htmlFor='email' className="flex flex-col gap-3">
          <Text className="font-semibold">Endereço de e-mail cadastrado</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input type='email' id='email' placeholder="Digite seu email cadastrado" />
          </TextInput.Root>
        </label>
        <Button type='submit' className="mt-4">Enviar link</Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size='sm'>
          <a href="#" className="text-gray-400 underline hover:text-gray-200">Possui conta? Faça seu login</a>
        </Text>
        <Text asChild size='sm'>
          <a href="#" className="text-gray-400 underline hover:text-gray-200">Não possui conta? Crie uma agora</a>
        </Text>
      </footer>
    </div>
  );
}

export { ForgotPassword };