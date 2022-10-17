import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { SignIn } from './pages/SignIn/SignIn';
import { ChangePassword } from './pages/ChangePassword/ChangePassword';
import { Register } from './pages/Register/Register';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };