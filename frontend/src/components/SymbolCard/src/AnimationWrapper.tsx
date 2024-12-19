import { useEffect, useRef, useState, useCallback } from 'react';

type AnimationWrapperProps = {
  price: number;
  children: (shake: boolean, glow: string, handleAnimationEnd: () => void) => React.ReactNode;
};

const AnimationWrapper = ({ price, children }: AnimationWrapperProps) => {
  const prevPriceRef = useRef<number | null>(null);
  const [animationState, setAnimationState] = useState<{
    shake: boolean;
    glow: 'green' | 'red' | '';
  }>({
    shake: false,
    glow: ''
  });

  useEffect(() => {
    if (prevPriceRef.current === null) {
      prevPriceRef.current = price;
      return;
    }

    const priceChange = price - prevPriceRef.current;
    const percentageChange = (Math.abs(priceChange) / prevPriceRef.current) * 100;

    setAnimationState({
      shake: percentageChange >= 75,
      glow: priceChange > 0 ? 'green' : priceChange < 0 ? 'red' : ''
    });

    const glowTimer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, glow: '' }));
    }, 1000);

    prevPriceRef.current = price;

    return () => clearTimeout(glowTimer);
  }, [price]);

  const handleAnimationEnd = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, shake: false }));
  }, []);

  return <>{children(animationState.shake, animationState.glow, handleAnimationEnd)}</>;
};

export default AnimationWrapper;
