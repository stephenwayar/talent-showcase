import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { UseFormReturnType } from '@mantine/form';
import Logo from '@/components/common/Logo';
import type { InitialValuesType } from '@/pages/auth/RegisterPage';
import { UseMutationResult } from '@tanstack/react-query';
import Input from '../custom/Input';
import { RegistrationPayload } from '@/services/types/auth.types';

interface Props {
  handleRegister: (values: InitialValuesType) => void
  mutation: UseMutationResult<{ user: any; session: any}, Error, RegistrationPayload, unknown>
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>;
}

export default function RegistrationForm({
  form,
  mutation,
  handleRegister
}: Props) {
  return (
    <form onSubmit={form.onSubmit((values) => handleRegister(values))} className='px-4 sm:px-8 py-14 sm:py-20'>
      <div className='mx-auto max-w-[37rem]'>
        <div className='mx-auto w-fit lg:hidden'>
          <Logo />
        </div>

        <div className='px-4 sm:px-6 py-8 bg-white shadow-sm rounded-[10px] mt-5 lg:mt-0'>
          <div className='text-center sm:text-left'>
            <h1 className='text-[#000000] font-bold text-2xl'>
              Create your account
            </h1>
          </div>

          <div className='mt-2 w-fit'>
            <Link to='/auth/login'>
              <p className='underline font-semibold text-[#090A04]'>
                I already have an account
              </p>
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            <div className='w-full'>
              <Input
                {...form.getInputProps('fullName')}
                type='text'
                label='Full name'
                placeholder="John Doe"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.fullName ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </div>

            <div>
              <Input
                {...form.getInputProps('email')}
                type='email'
                label='Email'
                placeholder="john@example.com"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </div>

            <div>
              <Input
                {...form.getInputProps('location')}
                type='text'
                label='Location'
                placeholder="City, Country"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.location ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </div>

            <div>
              <Input
                {...form.getInputProps('password')}
                type="password"
                label='Create password'
                placeholder="******"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.password ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </div>
          </div>

          <div className='mt-14'>
            <button
              disabled={mutation.isPending}
              type='submit'
              className='w-full disabled:opacity-50 h-[3.5rem] text-white text-center rounded-md dark:bg-[#333333] font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
            >
              {mutation.isPending ?
                <Icon
                  width="20"
                  height="20"
                  color="white"
                  icon="icomoon-free:spinner2"
                  className='animate-spin mx-auto'
                /> :
                'Create Account'
              }
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}