import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { selectSymbolCardData } from './src/selectors/symbolCardSelector';
import SymbolCardHeader from './src/SymbolCardHeader';
import SymbolCardPrice from './src/SymbolCardPrice';
import SymbolCardInfo from './src/SymbolCardInfo';
import { memo, useCallback, useMemo } from 'react';
import AnimationWrapper from './src/AnimationWrapper';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  isSelected: boolean;
  isAnySelected: boolean;
};

const SymbolCard = memo(({ id, onClick, price, isSelected, isAnySelected }: SymbolCardProps) => {
  const symbolData = useAppSelector((state) => selectSymbolCardData(state, id));
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const { trend, companyName, industry, marketCap } = symbolData;

  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  const cardClassName = useMemo(() => {
    const baseClass = 'symbolCard';
    const classes = [baseClass];

    if (isSelected) classes.push('symbolCard--selected');
    if (isAnySelected && !isSelected) classes.push('symbolCard--unselected');

    return classes.join(' ');
  }, [isSelected, isAnySelected]);

  return (
    <AnimationWrapper price={price}>
      {(shake, glow, handleAnimationEnd) => (
        <div
          onClick={handleOnClick}
          onAnimationEnd={handleAnimationEnd}
          className={`${cardClassName} ${shake ? 'symbolCard__shake' : ''} ${
            glow === 'green' ? 'symbolCard--greenGlow' : ''
          } ${glow === 'red' ? 'symbolCard--redGlow' : ''}`}
        >
          <SymbolCardHeader id={id} price={price} trend={trend} />
          <div className="symbolCard--body">
            <SymbolCardPrice price={price} />
            {showCardInfo && (
              <SymbolCardInfo
                companyName={companyName}
                industry={industry}
                marketCap={`${marketCap}`}
              />
            )}
          </div>
        </div>
      )}
    </AnimationWrapper>
  );
});

SymbolCard.displayName = 'SymbolCard';

export default SymbolCard;
