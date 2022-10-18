import axios from "axios";
import { Envelope, Lock } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Heading/Heading";
import { Logo } from "../../components/Logo/Logo";
import { Text } from "../../components/Text/Text";
import { TextInput } from "../../components/TextInput/TextInput";

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  email: yup.string().required('The field is required').email('The email is in the wrong format'),
  password: yup.string().required('The field is required'),
  confirmPassword: yup.string().required('The field is required'),
}).required();

function Register() {
  const [ isUserRegister, setIsUserRegister ] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    await axios.post('/register', {
      email: 'johndoe@example.com',
      password: '123456789',
      confirmPassword: '123456789',
    });

    setIsUserRegister(true);
    navigate('/');
  }

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
      <form onSubmit={handleRegister} className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-4">
        { isUserRegister && <Text>Conta criada com sucesso!</Text> }
        <label htmlFor="email" className="flex flex-col gap-3">
          <Text className="font-semibold">Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input type='email' id='email' placeholder="Digite seu e-mail" {...register('email')} />
          </TextInput.Root>
          <Text className="font-semibold text-red-300">{errors.email?.message}</Text>
        </label>
        <label htmlFor="password" className="flex flex-col gap-3">
          <Text className="font-semibold">Passwod</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='password' placeholder="*********" {...register('password')} />
          </TextInput.Root>
          <Text className="font-semibold text-red-300">{errors.password?.message}</Text>
        </label>
        <label htmlFor="confirmPassword" className="flex flex-col gap-3">
          <Text className="font-semibold">Confirm Password</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input type='password' id='confirmPassword' placeholder="*********" {...register('confirmPassword')} />
          </TextInput.Root>
          <Text className="font-semibold text-red-300">{errors.confirmPassword?.message}</Text>
        </label>
        <Button onClick={handleSubmit(onSubmit)} type='submit' className="mt-4">Criar conta</Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size='sm'>
          <Link to='/forgotpassword' className="text-gray-400 underline hover:text-gray-200">Esqueceu sua senha?</Link>
        </Text>
        <Text asChild size='sm'>
          <Link to='/' className="text-gray-400 underline hover:text-gray-200">Possui conta? Faça seu Login agora</Link>
        </Text>
      </footer>
    </div>
  );
}

export { Register };