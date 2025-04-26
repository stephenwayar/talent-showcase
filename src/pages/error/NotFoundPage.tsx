import { useLayoutEffect } from 'react';
import notfound from '@/assets/svgs/not-found.svg'
import Nav from '@/components/nav/Nav';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useLayoutEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div>
      <Nav />

      <div className="mt-20 flex justify-center">
        <div className="space-y-5 max-w-[500px]">
          <div className="w-[250px] mx-auto">
            <img
              alt="no-data"
              src={notfound}
              className="w-[350px] mx-auto"
            />
          </div>

          <p className="text-[#090A04] text-center text-4xl font-semibold">
            Oops!
          </p>

          <p className="text-[#667085] text-center text-lg">
            The page you are looking for does not exist
          </p>

          <div className="text-center">
            <Link to="/">
              <button className="bg-[#cc903c] hover:bg-[#cc903cdf] text-white h-[45px] rounded-lg text-center w-36">
                Go home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};