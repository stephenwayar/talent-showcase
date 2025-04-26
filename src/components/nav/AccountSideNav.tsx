import { Icon } from '@iconify/react/dist/iconify.js'
import AccountNavLink from './AccountNavLink'
import { supabase } from '@/config/supabase';
import { useAppState } from '@/hooks/useAppState';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function AccountSideNav() {
  const navigate = useNavigate();
  const { setUser } = useAppState();

  const links = [
    {
      text: 'Personal Details',
      linkTarget: '/account',
      icon: 'heroicons:user'
    },
    {
      text: 'Posts',
      linkTarget: '/account/posts',
      icon: 'bx:book-add'
    }
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut();

    Cookies.remove('session-user')
    setUser(null);
    navigate('/auth/login');
  }

  return (
    <div className='lg:w-[20rem] xl:w-[25rem] h-[90vh] fixed overflow-y-auto lg:border-r-2 border-neutral-200 pt-8 pb-20'>
      <p className='font-semibold text-lg text-[#090A04]'>
        Account
      </p>

      <div className='mt-10 space-y-10 relative' style={{ height: 'calc(100% - 15vh)' }}>
        {links.map((link, i) => (
          <AccountNavLink
            key={i}
            icon={link.icon}
            text={link.text}
            linkTarget={link.linkTarget}
          />
        ))}

        <div className="w-full">
          <button onClick={handleLogout} className='w-fit transition duration-75 delay-50 ease-linear'>
            <div className="items-center flex space-x-[10px]">
              <div className="w-[20px] h-[20px]">
                <Icon
                  color='#DC180C'
                  width="20" height="20"
                  icon='material-symbols:logout-rounded'
                />
              </div>

              <div>
                <p className="text-[#DC180C]">
                  Logout
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}