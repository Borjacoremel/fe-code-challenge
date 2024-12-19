import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StoreState {
  activeSymbol: string | null;
  showCardInfo: boolean;
  selectedSymbol: string | null;
}

const initialState: StoreState = {
  activeSymbol: '',
  showCardInfo: true,
  selectedSymbol: null
};

export const dashboardOptionsSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    toggleShowCardInfo: (state) => {
      state.showCardInfo = !state.showCardInfo;
    },
    setSelectedSymbol: (state, action: PayloadAction<string | null>) => {
      state.selectedSymbol = action.payload;
    }
  }
});

export const { toggleShowCardInfo, setSelectedSymbol } = dashboardOptionsSlice.actions;

export const selectShowCardInfo = (state: { store: StoreState }) => state.store.showCardInfo;
export const selectSelectedSymbol = (state: { store: StoreState }) => state.store.selectedSymbol;

export default dashboardOptionsSlice.reducer;
