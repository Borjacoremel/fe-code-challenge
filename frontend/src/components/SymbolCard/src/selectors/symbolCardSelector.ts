import { RootState } from '@/store';
import { StoreState } from '@/store/dashboardOptionsSlice';
import { PriceHistoryState } from '@/store/priceHistorySlice';
import { StocksState } from '@/store/stocksSlice';
import { createSelector } from '@reduxjs/toolkit';

export const selectSymbolCardData = createSelector(
  [(state: RootState) => state.stocks.entities, (_: RootState, id: string) => id],
  (entities, id) => entities[id]
);

export const makeSelectSymbolCardData = () =>
  createSelector(
    (state: {
      prices: { [key: string]: number };
      stocks: StocksState;
      priceHistory: PriceHistoryState;
      store: StoreState;
    }) => state,
    (_: any, id: string) => id,
    (
      state: {
        prices: { [key: string]: number };
        stocks: StocksState;
        priceHistory: PriceHistoryState;
        store: StoreState;
      },
      id
    ) => selectSymbolCardData(state, id)
  );
