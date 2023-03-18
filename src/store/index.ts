import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';

import reducers from './reducers';
import { useDispatch } from 'react-redux';
import { devToolConfig } from 'configs/devTool';

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production' && devToolConfig,
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
