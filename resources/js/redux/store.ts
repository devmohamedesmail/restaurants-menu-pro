import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cart-slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';



// persist config
const persistConfig = {
  key: 'cart',
  storage,
};

// wrap cartReducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);


// create store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

