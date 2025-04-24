import { useLayoutEffect } from 'react';

export default function NotFoundPage() {
  useLayoutEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div>
      <h1 className="text-center text-blue-700">
        NotFoundPage
      </h1>
    </div>
  );
};