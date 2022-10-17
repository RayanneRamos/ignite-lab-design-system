import axios from "axios";
import { Lock } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";
import { Logo } from "../../components/Logo/Logo";
import { Text } from "../../components/Text/Text";
import { TextInput } from "../../components/TextInput/TextInput";

function ChangePassword() {
  const [ isUserChangePassword, setIsUserChangePassword ] = useState(false);

  async function handleChangePassword(event: FormEvent) {
    event.preventDefault();

    await axios.put('/changepassword', {
      password: '123456789',
      confirmPassword: '123456789',
    });

    setIsUserChangePassword(true);
  }

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center text-gray-100 flex-col">
      <header className="flex flex-col items-center">
        <Logo />
        <Heading size='lg' className="mt-4">
          Ignite Lab
        </Heading>
        <Text size='lg' className="text-gray-400 mt-1">
          Crie uma nova senha
        </Text>
      </header>
      <form onSubmit={handleChangePassword} className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-4">
        { isUserChangePassword && <Text>Nova senha criada com sucesso.</Text> }
        <label htmlFor="password" className="flex flex-col gap-3">
          <Text className="font-semibold">Nova senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='password' placeholder="*********" />
          </TextInput.Root>
        </label>
        <label htmlFor="confirmPassword" className="flex flex-col gap-3">
          <Text className="font-semibold">Cofirme a nova senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='confirmPassword' placeholder="*********" />
          </TextInput.Root>
        </label>
        <Button type='submit' className="mt-4">Mudar senha</Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size='sm'>
          <a href='#' className="text-gray-400 underline hover:text-gray-200">Tem conta? Faça login agora</a>
        </Text>
        <Text asChild size='sm'>
          <a href='#' className="text-gray-400 underline hover:text-gray-200">Não possui conta? Crie uma agora</a>
        </Text>
      </footer>
    </div>
  );
}

export { ChangePassword };