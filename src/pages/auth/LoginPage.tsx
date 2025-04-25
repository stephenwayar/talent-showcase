import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from '@/hooks/useAppState';
import { login } from '@/services/api/auth';
import { LoginPayload } from '@/services/types/auth.types';
import LoginForm from '@/components/auth/LoginForm';
import { useLayoutEffect } from "react"
import { setCookieItem } from '@/helpers/functions/cookie';
import { IUser } from '@/types/user.types';

export interface InitialValuesType {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAppState();

  useLayoutEffect(() => {
    document.title = "Login";
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (
        !value ? 'Email is required' : null
      ),
      password: (value) => (
        !value ? 'Password is required' : null
      )
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onError: (error: { message: string }) => {
      form.setErrors({
        email: error.message || 'An error occurred'
      });
    },
    onSuccess: (data: IUser) => {
      // Store user data in global state and browser cookie
      setUser(data);
      setCookieItem('session-user', data);
      form.reset();

      // Handle redirect logic from query params
      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get("redirect") || '/account';

      setTimeout(() => {
        navigate(redirectUrl);
      }, 1500);
    }
  });

  const handleSubmit = (values: InitialValuesType) => {
    const payload: LoginPayload = {
      email: values.email,
      password: values.password,
    }

    mutation.mutate(payload)
  };

  return (
    <LoginForm
      form={form}
      mutation={mutation}
      handleSubmit={handleSubmit}
    />
  );
}