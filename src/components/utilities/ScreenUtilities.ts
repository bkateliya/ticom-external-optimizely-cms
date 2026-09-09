// Global
import { useCallback, useEffect, useState } from 'react';

//Inview Hook Type
type inView = {
  ref: React.RefObject<Element>;
  heigthDiffrence?: number;
};

/**
 *
 * @param ref Component wrapper reference.
 * @param heigthDiffrence Provide height if it will affecting the windows height after inView action.
 * @returns TRUE/FALSE
 */

export const useIsInView = ({ ref, heigthDiffrence = 0 }: inView): boolean => {
  const [isInView, setIsInView] = useState(false);

  const handleScroll = useCallback(() => {
    if (ref?.current) {
      const { top } = ref.current.getBoundingClientRect();

      // it will be true --> if Component's->TOP is less then the half of window's height [MEANS - component at center of screen]
      // &&(AND) half of the component's negative height is less then the component's top [MEANS - half of the component's top is at out of the screen]
      return setIsInView(
        window.innerHeight / 2 > (isInView ? top - heigthDiffrence : top) &&
        -ref.current.clientHeight / 2 < (isInView ? top + heigthDiffrence : top)
      );
    }
  }, [ref, isInView, heigthDiffrence]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, isInView, handleScroll]);

  return isInView;
};

// Check window object is accessible or not
export const canUseDOM = () => {
  return typeof window !== 'undefined' && window?.document?.createElement;
};

export default function useDeviceCheck() {
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  const [size, setSize] = useState((canUseDOM() && window?.innerWidth) || 0);
  function getIsMobile() {
    return window?.innerWidth <= 767;
  }
  function getIsSmallMobile() {
    return window?.innerWidth <= 375;
  }
  function getIsTab() {
    return window?.innerWidth <= 1024;
  }
  function getIsLaptop() {
    return window?.innerWidth <= 1240;
  }

  useEffect(() => {
    const onResize = () => {
      setIsSmallMobile(getIsSmallMobile());
      setIsMobile(getIsMobile());
      setIsTab(getIsTab());
      setIsLaptop(getIsLaptop());
      setSize(window?.innerWidth);
    };
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { isSmallMobile, isMobile, isTab, isLaptop, size };
}
