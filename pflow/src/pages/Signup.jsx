import React, { useState } from 'react';
import './Signup.css';


const Email = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chkPw, setChkPw] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 여부
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 여부

  // 이메일 중복 확인 요청
  const handleEmailCheck = async () => {
    try {
      const response = await fetch('http://192.168.0.144:5000/api/id_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: email })
      });

      const data = await response.json();
      if (response.ok && data.length === 0) {
        setMessage('사용 가능한 이메일입니다.');
        setIsEmailChecked(true); // 이메일 중복 확인 성공 시
      } else {
        setMessage('이미 존재하는 이메일입니다.');
        setIsEmailChecked(false);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
      setIsEmailChecked(false);
    }
  };

  // 인증 코드 전송 요청
  const handleSendCode = async () => {
    if (!isEmailChecked) {
      setMessage('이메일 중복 확인을 먼저 해주세요.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.144:5000/api/auth/sign-up/sendcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setIsCodeSent(true); // 인증 코드 전송 여부 업데이트
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
    }
  };

  // 비밀번호 확인 체크
  const [chkPwMessage, setChkPwMessage] = useState('');

  const handleChkPw = (e) => {

     setChkPw(e.target.value);

    if( password !== chkPw ) {
       // alert('비밀번호를 다시 확인해주세요.');
       setChkPwMessage(<span>확인완료!</span>);
    } else {
      //setChkPwMessage(<span>비밀번호를 다시 확인해주세요.</span>);
    }
  };
 

  // 인증 코드 검증 요청
  const handleVerifyCode = async () => {
    try {
      const response = await fetch('http://192.168.0.144:5000/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, enteredCode: code })
      });

      const data = await response.text(); // 서버에서 단순 텍스트 반환
      if (response.ok) {
        setMessage('인증 성공!');
        setIsVerified(true); // 인증 성공 시 회원가입 가능
      } else {
        setMessage(data);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
    }
  };

  // 회원 가입 요청 (이메일 인증 후에만 가능)
  const handleSignUp = async () => {
    if (!isVerified) {
      setMessage('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          gender,
          birthDate,
          phone,
          address1,
          address2
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('회원가입이 완료되었습니다!');
        window.location.replace("/Login");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('서버 오류 발생');
    }
  };

  return (
    <div className='sign-up'>
      <h2>회원가입</h2>
     
      <div className='email-section'>
        <label>
            이메일
        <input
        className='signup-input'
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        </label>
      <button onClick={handleEmailCheck} className='email-chk-btn'>중복 확인</button>
        </div>
        {isEmailChecked && (
        <>
          <button  className='code-btn' onClick={handleSendCode}>인증 코드 전송</button>
        </>
      )}

      {isCodeSent && (
        <>
          <div style={{ marginTop: '10px' }}>
            <input
              className='input-section'
              type="text"
              placeholder="인증 코드 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
             {message && <p>{message}</p>}
            <button className='code-btn' onClick={handleVerifyCode}>인증 코드 확인</button>
          </div>
        </>
      )}
        <div className='pw-section'>
      <label>
      비밀번호
      <input
      className='signup-input'
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={!isEmailChecked} // 이메일 중복 확인 후 입력 가능
      />
        </label>
        </div>
        <div className='pw-section'>
        <label>
      비밀번호 확인
      <input
        className='signup-input'
        type="password"
        placeholder="비밀번호 확인 입력"
        value={chkPw}
        onChange={handleChkPw}
        disabled={!isEmailChecked} // 이메일 중복 확인 후 입력 가능
      />
        </label>
        {chkPwMessage}
        </div>
        <div className='email-section-line'/>
        <div className='userinfo-section'>
        <label>
            이름
        <input className='name-input'
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!isEmailChecked}
      />
        </label>  
        <select
        className='gender-input'
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        disabled={!isEmailChecked}
      >
        <option value="">성별 선택</option>
        <option value="남">남성</option>
        <option value="여">여성</option>
      </select>
        </div>
        <div className='userinfo-section'>
        <label>
            생년월일
            <input
        className='birthdate-input'
        type="date"
        placeholder="생년월일 입력"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        disabled={!isEmailChecked}
      />
        </label>
<label>
    휴대폰 번호
      <input
        className='phone-input'
        type="tel"
        placeholder=" '-'를 제외한 번호만 입력해주세요."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={!isEmailChecked}
      />
      </label>
        </div> 
<div/>
<div className='address-section'>
<label>
    주소
    <input
        className='address-input'
        type="text"
        placeholder="주소 입력"
        value={address1}
        onChange={(e) => setAddress1(e.target.value)}
        disabled={!isEmailChecked}
      />
</label>
<label>
        상세주소
        <input
        className='address-input'
        type="text"
        placeholder="상세주소 입력"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
        disabled={!isEmailChecked}
      />
     </label>
</div>
<label>
        포트폴리오
        <input
        className='url-input'
        type="text"
        placeholder="url 입력"
        disabled={!isEmailChecked}
      />
     </label>
     

      {/* 이메일 인증이 완료되었을 때만 회원가입 버튼 활성화 */}
      <button  className='signup-btn' disabled={!isVerified} onClick={handleSignUp}>
        회원 가입
      </button>
      
    </div>
  );
};

export default Email;