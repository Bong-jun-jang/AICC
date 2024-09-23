import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CSS 파일 가져오기
import App from './App'; // App 컴포넌트 가져오기
import reportWebVitals from './reportWebVitals'; // 웹 성능 측정 관련 함수

import { Provider } from 'react-redux'; // Redux 스토어 제공자를 가져오기
import store from './store'; // 스토어 가져오기




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* 스토어를 제공자로 감싸서 하위 컴포넌트들이 스토어에 접근할 수 있게 함 */}
    {/* <React.StrictMode> */}
      <App /> {/* 최상위 App 컴포넌트를 렌더링 */}
    {/* </React.StrictMode> */}
  </Provider>
);

// 웹 성능을 측정하고, 필요 시 로그나 분석 서버에 데이터를 전송
reportWebVitals();