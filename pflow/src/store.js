import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice'; // authSlice 가져오기
import CategoryReducer from './slices/CategorySlice';

// Redux store 생성
const store = configureStore({
  reducer: {
    auth: AuthReducer, // auth slice를 스토어에 추가
    category: CategoryReducer,
  },
});

export default store;