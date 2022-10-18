import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";
import { Logo } from "../../components/Logo/Logo";
import { Text } from "../../components/Text/Text";
import { TextInput } from "../../components/TextInput/TextInput";

interface IFormInputs {
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  password: yup.string().required('This field is required'),
  confirmPassword: yup.string().required('This field is required')
}).required();

function ChangePassword() {
  const [ isUserChangePassword, setIsUserChangePassword ] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  async function handleChangePassword(event: FormEvent) {
    event.preventDefault();

    await axios.put('/changepassword', {
      password: '123456789',
      confirmPassword: '123456789',
    });

    setIsUserChangePassword(true);
    navigate('/');
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
        { isUserChangePassword && <Text>Nova senha criada com sucesso!</Text> }
        <label htmlFor="password" className="flex flex-col gap-3">
          <Text className="font-semibold">Nova senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='password' placeholder="*********" {...register('password')} />
          </TextInput.Root>
          <Text className="font-semibold text-red-300">{errors.password?.message}</Text>
        </label>
        <label htmlFor="confirmPassword" className="flex flex-col gap-3">
          <Text className="font-semibold">Cofirme a nova senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='confirmPassword' placeholder="*********" {...register('confirmPassword')} />
          </TextInput.Root>
          <Text className="font-semibold text-red-300">{errors.confirmPassword?.message}</Text>
        </label>
        <Button onClick={handleSubmit(onSubmit)} type='submit' className="mt-4">Mudar senha</Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size='sm'>
          <Link to='/' className="text-gray-400 underline hover:text-gray-200">Tem conta? Faça login agora</Link>
        </Text>
        <Text asChild size='sm'>
          <Link to='/register' className="text-gray-400 underline hover:text-gray-200">Não possui conta? Crie uma agora</Link>
        </Text>
      </footer>
    </div>
  );
}

export { ChangePassword };