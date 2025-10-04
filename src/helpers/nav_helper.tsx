import { useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar';
import App from '../App.tsx';
import About from '../pages/about.tsx';
import Contact from '../pages/contact.tsx';
import Github from '../pages/github.tsx';
import Services from '../pages/services.tsx';

const NavigationLoader = () => {
  const location = useLocation();
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => {
    console.log('NavigationLoader: Starting loading bar for path', location.pathname);
    ref.current?.continuousStart();
    const timer = setTimeout(() => {
      console.log('NavigationLoader: Completing loading bar for path', location.pathname);
      ref.current?.complete();
    }, 500); // Minimum 500ms for visibility

    return () => {
      console.log('NavigationLoader: Cleaning up for path', location.pathname);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <LoadingBar
      height={4}
      color="#3B82F6"
      shadow={true}
      ref={ref}
    />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavigationLoader />
        <App />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <NavigationLoader />
        <About />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <NavigationLoader />
        <Contact />
      </>
    ),
  },
  {
    path: "/github",
    element: (
      <>
        <NavigationLoader />
        <Github />
      </>
    ),
  },
  {
    path: "/services",
    element: (
      <>
        <NavigationLoader />
        <Services />
      </>
    ),
  },
]);

const RootComponent = () => {
  return <RouterProvider router={router} />;
};

export default RootComponent;