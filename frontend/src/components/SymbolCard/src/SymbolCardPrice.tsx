import { memo } from 'react';
import './symbolCardPrice.css';

type SymbolCardPriceProps = {
  price: number;
};

const SymbolCardPrice = memo(({ price }: SymbolCardPriceProps) => (
  <div className="symbolCardPrice">
    <h4 className="symbolCardPrice--priceTitle">Price:</h4>
    <div className="symbolCardPrice--priceValue">
      {price ? (price >= 10 ? `$${Math.trunc(price)}` : `$${price.toFixed(1)}`) : '--'}
    </div>
  </div>
));

SymbolCardPrice.displayName = 'SymbolCardPrice';

export default SymbolCardPrice;
