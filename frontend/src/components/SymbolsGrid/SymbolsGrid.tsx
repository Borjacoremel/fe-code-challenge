import { useEffect, useCallback, useMemo } from 'react';
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

  const handleCardClick = useCallback(
    (symbolId: string) => {
      onSymbolClick(symbolId);
      dispatch(setSelectedSymbol(selectedSymbol === symbolId ? null : symbolId));
    },
    [onSymbolClick, dispatch, selectedSymbol]
  );

  const symbolCards = useMemo(
    () =>
      stockSymbols.map((id) => (
        <SymbolCard
          price={prices[id]}
          onClick={handleCardClick}
          key={id}
          id={id}
          isSelected={selectedSymbol === id}
          isAnySelected={selectedSymbol !== null}
        />
      )),
    [stockSymbols, prices, handleCardClick, selectedSymbol]
  );

  return <div className="symbolsGrid">{symbolCards}</div>;
};

export default SymbolsGrid;
