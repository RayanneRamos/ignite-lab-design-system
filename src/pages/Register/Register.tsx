import { Envelope, Lock } from "phosphor-react";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";
import { Logo } from "../../components/Logo/Logo";
import { Text } from "../../components/Text/Text";
import { TextInput } from "../../components/TextInput/TextInput";

function Register() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center text-gray-100 flex-col">
      <header className="flex flex-col items-center">
        <Logo />
        <Heading size='lg' className='mt-4'>
          Ignite Lab
        </Heading>
        <Text size='lg' className="text-gray-400 mt-1">
          Crie uma conta e comece a usar!
        </Text>
      </header>
      <form className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-4">
        <label htmlFor="email" className="flex flex-col gap-3">
          <Text className="font-semibold">Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input type='email' id='email' placeholder="Digite seu e-mail" />
          </TextInput.Root>
        </label>
        <label htmlFor="password" className="flex flex-col gap-3">
          <Text className="font-semibold">Passwod</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='password' placeholder="*********" />
          </TextInput.Root>
        </label>
        <label htmlFor="confirmPassword" className="flex flex-col gap-3">
          <Text className="font-semibold">Confirm Password</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='confirmPassword' placeholder="*********" />
          </TextInput.Root>
        </label>
        <Button type='submit' className="mt-4">Criar conta</Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size='sm'>
          <a href='#' className="text-gray-400 underline hover:text-gray-200">Esqueceu sua senha?</a>
        </Text>
        <Text asChild size='sm'>
          <a href='#' className="text-gray-400 underline hover:text-gray-200">Possui conta? Faça seu Login agora</a>
        </Text>
      </footer>
    </div>
  );
}

export { Register }