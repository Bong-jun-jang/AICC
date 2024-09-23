import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux'; // Redux dispatch 가져오기
import { login } from '../slices/AuthSlice'; // api 로직 가져오기

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const dispatch = useDispatch(); // Redux dispatch 함수

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`보낼 데이터 = ID : ${id}, PW : ${pw}`);

    let credentials = {
      ID: id,
      PW: pw,
    };

    // 로그인 액션 디스패치
    dispatch(login(credentials));
    alert('정상적으로 로그인 되었습니다.');
  };

  return (
    <div className='log-in'>
      <form className='login-form' onSubmit={handleLogin}>
        <div>
          <label htmlFor='ID'>ID </label>
          <input
            type='text'
            placeholder='Enter ID'
            className='input-section'
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='PW'>PW </label>
          <input
            type='password'
            placeholder='Enter PW'
            className='input-section'
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <div className='custom-line' />
        <button type='submit' className='submit-login-btn'>Login</button>
        <Link to='/SignUp'><button className='signup-link-btn'>회원가입</button></Link>
      </form>
    </div>
  );
};

export default Login;
