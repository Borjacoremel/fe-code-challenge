import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import { selectSelectedSymbol, setSelectedSymbol } from '@/store/dashboardOptionsSlice';
import './symbolsGrid.css';

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const selectedSymbol = useAppSelector(selectSelectedSymbol);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  const handleCardClick = (symbolId: string) => {
    onSymbolClick(symbolId);
    if (selectedSymbol === symbolId) {
      dispatch(setSelectedSymbol(null));
    } else {
      dispatch(setSelectedSymbol(symbolId));
    }
  };

  return (
    <div className="symbolsGrid">
      {stockSymbols.map((id, i) => (
        <SymbolCard
          price={prices[id]}
          onClick={handleCardClick}
          key={i}
          id={id}
          isSelected={selectedSymbol === id}
          isAnySelected={selectedSymbol !== null}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
