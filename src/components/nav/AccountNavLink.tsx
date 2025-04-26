import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useHover } from '@mantine/hooks';

interface Props {
  text: string,
  icon: string,
  linkTarget: string
}

const AccountNavLink: React.FC<Props> = ({
  text,
  icon,
  linkTarget,
}) => {
  const location = useLocation();
  const { hovered, ref }: any = useHover();

  const isActive = location.pathname === linkTarget;

  return (
    <div className="w-full">
      <Link to={linkTarget}>
        <button
          ref={ref}
          className={`w-fit transition duration-75 delay-50 ease-linear ${isActive ? 'text-[#cc903c]' : 'text-[#090A04] hover:text-[#cc903c]'
            }`}
        >
          <div className="flex items-center space-x-[10px]">
            <div className="w-[20px] h-[20px]">
              <Icon
                icon={icon}
                color={(hovered || isActive) ? '#cc903c' : '#090A04'}
                width="20"
                height="20"
              />
            </div>

            <div>
              <span>{text}</span>
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default AccountNavLink;