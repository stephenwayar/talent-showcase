import { IUser } from "@/services/types/auth.types";
import { Link, useLocation } from "react-router-dom";
import Logo from "../common/Logo";
import { Burger } from "@mantine/core";

interface MobileMenuProps {
  user: IUser | null;
  opened: boolean;
  toggle: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, opened, toggle }) => {
  const location = useLocation();

  if (!opened) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <nav className="border-b-2 sticky z-10 top-0 bg-white border-neutral-200">
        <div className="px-4 sm:px-8 md:px-10">
          <div className="w-full max-w-[70rem] xl:max-w-[80rem] mx-auto">
            <div className="h-[90px] flex space-x-10 items-center justify-between">
              <div className="items-center flex space-x-4">
                <Link to='/' onClick={toggle}>
                  <Logo />
                </Link>
              </div>

              <Burger
                size='md'
                color="black"
                opened={opened}
                onClick={toggle}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-5 px-4 sm:px-8 md:px-10">
        <div className="w-full max-w-[70rem] xl:max-w-[80rem] mx-auto">
          <div>
            <div className="flex flex-col items-center space-y-8">
              <div>
                <Link
                  to="/"
                  onClick={toggle}
                  className={location.pathname === '/' ? 'border-b-2 text-[#090A04] font-semibold border-[#090A04]' : 'font-semibold'}
                >
                  Feed
                </Link>
              </div>

              {user ? (
                <div>
                  <Link to="/account" onClick={toggle}>
                    <button className="bg-[#090A04] text-white h-[55px] rounded-full text-center w-28">
                      Account
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-8">
                  <div>
                    <Link to="/auth/login" onClick={toggle}>
                      <button className="text-[#090A04] font-semibold">
                        Login
                      </button>
                    </Link>
                  </div>

                  <div>
                    <Link to="/auth/register" onClick={toggle}>
                      <button className="bg-[#090A04] text-white h-[55px] rounded-full text-center w-28">
                        Register
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu