import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Envelope, Lock } from "phosphor-react";
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Text } from '../../components/Text/Text';
import { TextInput } from '../../components/TextInput/TextInput';
import { Logo } from '../../components/Logo/Logo';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required('This field is required').email('The email is in the wrong format'),
  password: yup.string().required('This field is required')
}).required();

function SignIn() {
  const [ isUserSignedIn, setIsUserSignedIn ] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    await axios.post('/sessions', {
      email: 'johndoe@example.com',
      password: '123456789',
    });
    
    setIsUserSignedIn(true);
    navigate('/');
  }

  return (
    <div className='w-screen h-screen bg-gray-900 flex items-center justify-center text-gray-100 flex-col'>
      <header className='flex flex-col items-center '>
        <Logo />
        <Heading size="lg" className='mt-4'>
          Ignite Lab
        </Heading>
        <Text size='lg' className='text-gray-400 mt-1'>
          Faça login e comece a usar
        </Text>
      </header>
      <form onSubmit={handleSignIn} className='flex flex-col items-stretch w-full max-w-sm mt-10 gap-4'>
        { isUserSignedIn && <Text>Login realizado!</Text> }
        <label htmlFor='email' className='flex flex-col gap-3'>
          <Text className='font-semibold'>Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input type='email' id='email' placeholder='Digite seu e-mail' {...register('email')} />
          </TextInput.Root>
          <Text className='font-semibold text-red-300'>{errors.password?.message}</Text>
        </label>
        <label htmlFor='password' className='flex flex-col gap-3'>
          <Text className='font-semibold'>Sua senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='password' placeholder='************' {...register('password')} />
          </TextInput.Root>
          <Text className='font-semibold text-red-300'>{errors.password?.message}</Text>
        </label>
        <label htmlFor='remember' className='flex items-center gap-2'>
          <Checkbox id='remember' />
          <Text size='sm' className='text-gray-200'>Lembrar de mim por 30 dias</Text>
        </label>
        <Button onClick={handleSubmit(onSubmit)} type='submit' className='mt-4 '>Entrar na plataforma</Button>
      </form>
      <footer className='flex flex-col items-center gap-4 mt-8'>
        <Text asChild size='sm'>
          <Link to='/forgotpassword' className='text-gray-400 underline hover:text-gray-200'>Esqueceu sua senha</Link>
        </Text>
        <Text asChild size='sm'>
          <Link to='register' className='text-gray-400 underline hover:text-gray-200'>Não possui conta? Crie uma agora</Link>
        </Text>
      </footer>
    </div>
  );
}

export { SignIn };