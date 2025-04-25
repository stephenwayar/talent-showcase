import RegistrationForm from "@/components/auth/RegistrationForm";
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { register } from "@/services/api/auth";
import toast from "react-hot-toast";
import { RegistrationPayload } from "@/services/types/auth.types";
import { useLayoutEffect } from "react";

export interface InitialValuesType {
  email: string;
  fullName: string;
  location: string;
  password: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "Register";
  }, []);

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      location: '',
      password: '',
    },

    validate: {
      fullName: (value) => (
        !value ? 'Name is required' : null
      ),
      email: (value) => (
        !value ? 'Email is required' : value.includes('@') ? null : 'Invalid email'
      ),
      location: (value) => (
        !value ? 'Location is required' : null
      ),
      password: (value) => (
        !value ? 'Password is required' : value.length < 6 ? 'Password must be at least 6 characters' : null
      ),
    },
  });

  const mutation = useMutation({
    mutationFn: (data: RegistrationPayload) => register(data),
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
    onSuccess: () => {
      toast.success('Registration Successful!');
      form.reset();

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    },
  });

  const handleRegister = (values: InitialValuesType) => {
    mutation.mutate(values);
  };

  return (
    <RegistrationForm
      form={form}
      mutation={mutation}
      handleRegister={handleRegister}
    />
  );
}