import { memo } from 'react';
import TrendDownImg from '@/assets/down.png';
import TrendUpImg from '@/assets/up.png';
import './cardHeader.css';

type CardHeaderProps = {
  id: string;
  price: number;
  trend: 'UP' | 'DOWN' | null;
};

const CardHeader = memo(({ id, price, trend }: CardHeaderProps) => (
  <div className="symbolCard--header">
    <div className="symbolCard--header__title">{id}</div>
    <div className="symbolCard--header__trend">
      {!!price && (
        <img
          src={trend === 'DOWN' ? TrendDownImg : TrendUpImg}
          alt={`Trend ${trend}`}
          className="trend-icon"
        />
      )}
    </div>
  </div>
));

CardHeader.displayName = 'CardHeader';

export default CardHeader;
