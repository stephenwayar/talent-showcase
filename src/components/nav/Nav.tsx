import { useState } from "react";
import Logo from "../common/Logo";
import { Burger } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useAppState } from "@/hooks/useAppState";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  const location = useLocation();
  const { user } = useAppState();
  const [opened, setOpened] = useState(false);

  const toggle = () => setOpened(!opened);

  return (
    <nav className="border-b-2 sticky z-10 top-0 bg-white border-neutral-200">
      <div className="px-4 sm:px-8 md:px-10">
        <div className="w-full max-w-[70rem] xl:max-w-[80rem] mx-auto">
          <div className="h-[90px] flex items-center justify-between">
            <Link to='/'>
              <Logo />
            </Link>

            <Burger
              size='md'
              color="black"
              opened={opened}
              onClick={toggle}
              className="md:hidden"
            />

            <MobileMenu
              user={user}
              opened={opened}
              toggle={toggle}
            />

            <div className="md:block hidden">
              <div className="items-center flex space-x-8">
                <div>
                  <Link
                    className={location.pathname === '/' ? 'border-b-2 text-[#090A04] font-semibold border-[#090A04]' : 'font-semibold'}
                    to="/"
                  >
                    Feed
                  </Link>
                </div>

                {user ? (
                  <div>
                    <Link to="/account">
                      <button className="bg-[#090A04] text-white h-[55px] rounded-full text-center w-28">
                        Account
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="items-center flex space-x-8">
                    <div>
                      <Link to="/auth/login">
                        <button className="text-[#090A04] font-semibold">
                          Login
                        </button>
                      </Link>
                    </div>

                    <div>
                      <Link to="/auth/register">
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
    </nav>
  );
}