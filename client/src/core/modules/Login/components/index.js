import { lazy } from 'react';

const LoginForm = lazy(() => import('./LoginForm'));

const OTPModal = lazy(() => import('./OTPModal'));
const UserMenu = lazy(() => import('./UserMenu'));


export { LoginForm, OTPModal, UserMenu };
