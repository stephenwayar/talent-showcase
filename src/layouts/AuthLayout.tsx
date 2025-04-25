import Logo from '@/components/common/Logo';
import { Link, Outlet } from 'react-router-dom';
import hero from '@/assets/imgs/bookied.jpg'

export default function AuthLayout() {
  return (
    <div className='w-full max-w-[70rem] xl:max-w-[80rem] mx-auto'>
      <div className="hidden lg:block">
        <div className="w-[50%] h-[100vh] space-y-3 p-10 fixed">
          <div className='w-fit'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          <div className='rounded-lg h-[90%] w-fit overflow-hidden'>
            <div
              className="w-[470px] transition duration-[500ms] delay-75 hover:brightness-50 hover:scale-125 xl:w-[500px] h-full bg-cover bg-left bg-no-repeat"
              style={{ backgroundImage: `url(${hero})` }}
            />
          </div>
        </div>
      </div>

      <div className="lg:ml-[50%]">
        <div className='lg:flex w-full h-[100vh] lg:items-center'>
          <div className='w-full'>
            <Outlet />
          </div>
        </div>
      </div> 
    </div>
  )
}