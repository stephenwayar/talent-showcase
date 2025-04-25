import { Link } from 'react-router-dom';
import { UseFormReturnType } from '@mantine/form';
import type { InitialValuesType } from '@/pages/auth/LoginPage';
import Logo from '@/components/common/Logo';
import { UseMutationResult } from '@tanstack/react-query';
import Input from '../custom/Input';
import { Icon } from '@iconify/react';
import { LoginPayload } from '@/services/types/auth.types';
import { IUser } from '@/types/user.types';

type Props = {
  handleSubmit: (values: InitialValuesType) => void;
  mutation: UseMutationResult<IUser, {
    message: string;
  }, LoginPayload, unknown>
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>;
}

export default function LoginForm({
  form,
  mutation,
  handleSubmit
}: Props) {
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className='px-4 sm:px-8 py-14 sm:py-20'>
      <div className='mx-auto max-w-[37rem]'>
        <div className='mx-auto w-fit lg:hidden'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>

        <div className='px-4 sm:px-6 py-8 bg-white shadow-sm rounded-[10px] mt-5 lg:mt-0'>
          <div className='text-center sm:text-left space-y-2'>
            <h1 className='text-[#000000] font-bold text-2xl'>
              Welcome Back!
            </h1>
          </div>

          <div className="mt-5 space-y-4">
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
                {...form.getInputProps('password')}
                type="password"
                label='Password'
                placeholder="******"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.password ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='w-fit'>
                <Link to='/auth/register'>
                  <p className='underline font-semibold text-[#090A04]'>
                    Register Account
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className='mt-14'>
            <button
              type='submit'
              disabled={mutation.isPending}
              className='w-full hover:cursor-pointer disabled:opacity-50 h-[3.5rem] text-white dark:bg-[#333333] text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
            >
              {mutation.isPending ?
                <Icon
                  className='animate-spin mx-auto'
                  icon="icomoon-free:spinner2"
                  color="white"
                  width="20"
                  height="20"
                /> :
                'Login'
              }
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}