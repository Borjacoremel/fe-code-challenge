import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectSymbolCardData = createSelector(
  [(state: RootState) => state.stocks.entities, (_: RootState, id: string) => id],
  (entities, id) => entities[id]
);
