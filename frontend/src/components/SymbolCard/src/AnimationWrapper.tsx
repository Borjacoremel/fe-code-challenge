import { useEffect, useRef, useState, useCallback } from 'react';

type AnimationWrapperProps = {
  price: number;
  children: (shake: boolean, glow: string, handleAnimationEnd: () => void) => React.ReactNode;
};

const AnimationWrapper = ({ price, children }: AnimationWrapperProps) => {
  const prevPriceRef = useRef<number | null>(null);
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState<'green' | 'red' | ''>('');

  useEffect(() => {
    if (prevPriceRef.current === null) {
      prevPriceRef.current = price;
      return;
    }

    const priceChange = price - prevPriceRef.current;
    const percentageChange = (Math.abs(priceChange) / prevPriceRef.current) * 100;

    if (percentageChange >= 75) {
      setShake(true);
    }

    if (priceChange > 0) {
      setGlow('green');
    } else if (priceChange < 0) {
      setGlow('red');
    }

    const glowTimer = setTimeout(() => setGlow(''), 1000);
    prevPriceRef.current = price;

    return () => clearTimeout(glowTimer);
  }, [price]);

  const handleAnimationEnd = useCallback(() => {
    setShake(false);
  }, []);

  return <>{children(shake, glow, handleAnimationEnd)}</>;
};

export default AnimationWrapper;
