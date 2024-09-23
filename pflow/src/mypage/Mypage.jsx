import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Siderbar';
import './Mypage.css';
import axios from 'axios';
const Mypage = () => {
    const [user, setUser] = useState(''); // 유저 정보를 null로 초기화
    const [changeInfo, setChangeInfo] = useState({
        name: '',
        gender: '',
        birthDate: '',
        phone: '',
        address1: '',
        address2: '',
        password: ''
    })
    //const [isLogin, setIsLogin] = useState(false); // 로그인 여부를 false로 초기화
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/mypage', {
                    method: "GET",
                    credentials: 'include', // 쿠키를 포함하여 요청
                });
                if (response.ok) {
                    const data = await response.json(); // JSON 형식으로 응답 변환
                    console.log( '유저정보다:',data)
                    setUser(data[0]);
                    //setIsLogin(true);
                } else {
                    console.error('로그인 실패',Error.name);
                }
            } catch (error) {
                console.error('유저정보 못가져옴:', Error);
                //setIsLogin(false);
            }
        };
        getUserInfo(); // useEffect 내에서 호출
    }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 실행  <h1>{isLogin ? `${user?.user}님 환영합니다!` : '로그인 해주세요!'}</h1>
    //changeInfo onchange
    const handleChange = (e) => {
        const {name, value} = e.target;
        setChangeInfo({
            ...changeInfo,
            [name]: value,
        });
    };
    // 유저정보 수정 요청
    const updateUserInfo = async () => {
        try {
            const resput = await axios.put('http://localhost:5000/api/mypage', {
                changeInfo,
            }, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
            console.log('response',resput);
            alert(resput.data.message)
            
        } catch (error) {
            console.error('catch error', error);
        }
    };
    return (
        <div className='Mypage'>
            <Sidebar/>
            <div className='my-profile'>
            <h1>{user.info_name}님 환영합니다!</h1>
            <div className='mypage-active'>
            <ul>
                    <h2>{user.board_count}</h2>
                    <span>내가 작성한 포스트</span>
                </ul>
                <ul>
                    <h2>{user.comment_count}</h2>
                    <span>내가 작성한 댓글</span>
                </ul>
                <ul>
                    <h2>{user.resume_count}</h2>
                    <span>내가 작성한 이력서</span>
                </ul>
            </div>
                <h3 className='mypage-headline'>나의 정보 수정</h3>
                <div className='userinfo-update'>
                <label>
            이름
        <input className='name-input'
        type="text"
        name='name'
        placeholder={user.info_name}
        value={changeInfo.name}
        onChange={handleChange}
      />
        </label>
        <select
        onChange={handleChange}
        className='gender-input'
        name='gender'
       // placeholder={user.info_gender}
      >
        <option value={changeInfo.gender}>성별 선택</option>
        <option value="남">남성</option>
        <option value="여">여성</option>
      </select>
      <label>
            생년월일
            <input
        className='name-input'
        type="date"
        name='birthDate'
        placeholder={user.info_birth}
        value={changeInfo.birthDate}
        onChange={handleChange}
      />
        </label>
        <label>
    휴대폰 번호
      <input
        className='name-input'
        type="tel"
        name='phone'
        placeholder={user.info_phone_number}
        value={changeInfo.phone}
        onChange={handleChange}
      />
      </label>
      <label>
    주소
    <input
        className='name-input'
        type="text"
        name='address1'
        placeholder={user.info_address}
        value={changeInfo.address1}
        onChange={handleChange}
      />
</label>
<label>
        상세주소
        <input
        className='name-input'
        type="text"
       placeholder={user.info_detail}
       name='address2'
       value={changeInfo.address2}
       onChange={handleChange}
      />
     </label>
     <label>
        포트폴리오url
        <input
        className='name-input'
        type="text"
        placeholder="url 입력"
      />
     </label>
     <label>
        비밀번호 인증
        <input
        className='name-input'
        type="password"
        name='password'
        placeholder="비밀번호 입력"
        value={changeInfo.password}
        onChange={handleChange}
      />
     </label>
     <button  className='signup-btn' onClick={updateUserInfo}>
        비밀번호 인증으로 정보 수정
      </button>
                </div>
            </div>
        </div>
    );
};
export default Mypage;