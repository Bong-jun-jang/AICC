// // slices/AuthSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isLogin: false, // Redux 스토어의 상태가 애플리케이션이 처음 렌더링될 때 초기 상태
// };

// const AuthSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state) => {
//       state.isLogin = true; // 로그인 성공 시 상태를 true로 변경
//     },
    
//     logout: (state) => {
//       state.isLogin = false; // 로그아웃 시 상태를 false로 변경
//     },

//   },
// });

// // 액션과 리듀서 export
// export const { loginSuccess, logout } = AuthSlice.actions;
// export default AuthSlice.reducer;



// slices/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLogin: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

// 비동기 액션
export const login = (body) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/sign-in',
      body,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      dispatch(AuthSlice.actions.loginSuccess());
      console.log('로그인을 성공했습니다.');
      window.location.replace('/');
    }
  } catch (error) {
    console.error(`로그인 실패: ${error.response?.data?.message || error.message}`);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/sign-out', {}, {
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch(AuthSlice.actions.logout());
      console.log('로그아웃 되었습니다.');
      alert('로그아웃 되었습니다.');
      window.location.replace('/');
    }
  } catch (error) {
    console.error('로그아웃 오류', error);
  }
};

// 액션과 리듀서 export
export default AuthSlice.reducer;

