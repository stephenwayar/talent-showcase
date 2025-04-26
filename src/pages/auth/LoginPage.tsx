import { useForm } from '@mantine/form';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { useAppState } from '@/hooks/useAppState';
import { login } from '@/services/api/auth';
import { IUser, LoginPayload } from '@/services/types/auth.types';
import LoginForm from '@/components/auth/LoginForm';
import { useLayoutEffect } from "react"
import { setCookieItem } from '@/helpers/functions/cookie';

export interface InitialValuesType {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
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
      setUser(data);
      setCookieItem('session-user', data);
      form.reset();

      const params = new URLSearchParams(window.location.search);

      if (params.has("redirect")) {
        const redirectUrl = params.get("redirect");
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate('/account');
        }
      } else {
        navigate('/account');
      }
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