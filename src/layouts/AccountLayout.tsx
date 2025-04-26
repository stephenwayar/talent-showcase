import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks'
import { Drawer } from '@mantine/core'
import AccountSideNav from '@/components/nav/AccountSideNav';
import Nav from '@/components/nav/Nav';
import { useEffect, useRef } from 'react';

export default function AccountLayout() {
  const startX = useRef(0);
  const startY = useRef(0);
  const isTracking = useRef(false);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0].clientX < 30) { // Only start tracking near left edge
        startX.current = e.touches[0].clientX;
        startY.current = e.touches[0].clientY;
        isTracking.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTracking.current) return;

      const deltaX = e.touches[0].clientX - startX.current;
      const deltaY = e.touches[0].clientY - startY.current;

      // Check if horizontal swipe (more horizontal than vertical movement)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) { // Minimum swipe distance
          open();
          isTracking.current = false; // Reset tracking
        }
      } else {
        // If more vertical movement, stop tracking as it's likely a scroll
        isTracking.current = false;
      }
    };

    const handleTouchEnd = () => {
      isTracking.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  return (
    <div>
      <Nav />

      <div className='px-4 sm:px-8 md:px-10'>
        <div className='w-full max-w-[70rem] xl:max-w-[80rem] mx-auto'>
          <div className='hidden lg:block'>
            <AccountSideNav />
          </div>

          <Drawer
            padding={0}
            opened={opened}
            onClose={close}
          >
            <div className='px-8 h-screen'>
              <AccountSideNav />
            </div>
          </Drawer>

          <div className='lg:ml-[20rem] xl:ml-[25rem]'>
            <div className='lg:pl-10 pt-8 pb-20 space-y-5'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}