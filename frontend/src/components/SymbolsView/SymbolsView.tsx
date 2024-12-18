import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useState } from 'react';
import './symbolsView.css';

const SymbolsView = () => {
  const [activeSymbol, setActiveSymbol] = useState<null | string>(null);
  const handleSymbolClick = (symbolId: string) => {
    setActiveSymbol((s) => (s === symbolId ? null : symbolId));
  };

  return (
    <div className="symbolsView">
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <h3 className="symbolsView__title">PRICE HISTORY</h3>
          <PriceChart symbolId={activeSymbol} />
        </div>
        <div className="symbolsView__cards">
          <SymbolsGrid onSymbolClick={handleSymbolClick} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
