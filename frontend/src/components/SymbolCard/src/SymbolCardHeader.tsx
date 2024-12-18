import { memo } from 'react';
import TrendDownImg from '@/assets/down.png';
import TrendUpImg from '@/assets/up.png';
import './cardHeader.css';

type SymbolCardHeaderProps = {
  id: string;
  price: number;
  trend: 'UP' | 'DOWN' | null;
};

const SymbolCardHeader = memo(({ id, price, trend }: SymbolCardHeaderProps) => (
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

SymbolCardHeader.displayName = 'SymbolCardHeader';

export default SymbolCardHeader;
