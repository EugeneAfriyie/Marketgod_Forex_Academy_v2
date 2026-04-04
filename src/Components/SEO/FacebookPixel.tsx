import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const FacebookPixel = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the first render because index.html handles the initial PageView
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Track subsequent page views
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

export default FacebookPixel;



