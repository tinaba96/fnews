import {createStore, combineReducers} from 'redux';
import userReducer from './reducers/user';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
// import {AsyncStorage} from 'react-native';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage'
// import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
//   storage: storage,
  storage,
//   storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
// const store = createStore(persistedReducer, composeWithDevTools());

export const persistor = persistStore(store);
export default store;
