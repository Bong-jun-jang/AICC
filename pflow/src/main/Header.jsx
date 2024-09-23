import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './main.css';

//import { useSelector, useDispatch } from 'react-redux'; // 리덕스 훅


function Header() {
  //const navigate = useNavigate(); // useNavigate 훅
  //const dispatch = useDispatch();
  //const isLogin = useSelector((state) => state.auth.isLogin); // 로그인 상태 가져오기
 


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);



  // 드롭다운 상태 설정
  const onDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropOut = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // 드롭다운 바닥 클릭 시 안 보이게 설정
  useEffect(() => {
    document.addEventListener('mousedown', handleDropOut);

    return () => {
      document.removeEventListener('mousedown', handleDropOut);
    };
  }, []);

  return (
    <div className='Header'>
      <div className='nav'>
        <div className='logo'>
          <div className='logo-icon'>
            <div className='group'>
              <div className='vector' />
              <div className='vector-3' />
            </div>
            <div className='vector-4' />
          </div>
          <Link to="/" className='pflow'>PFLOW</Link>
        </div>
        <div className='menu'>
          <ul className='tags'>
            <li><Link to="/resume/Resume1" className='tag'>이력서 작성</Link></li>
            <li><Link to="/Chatbot" className='tag'>회사 추천</Link></li>
            <li><Link to="/Mypage" className='tag'>MY PAGE</Link></li>
            <li><Link to="/Community" className='tag'>커뮤니티</Link></li>
          </ul>
          <Link to="/login" className='login'>
              <button className='login-btn'>로그인</button>
            </Link>
          {/* {isLogin ? (
            <button  className='logout-btn'>로그아웃</button>
          ) : (
            <Link to="/login" className='login'>
              <button className='login-btn'>로그인</button>
            </Link>
          )} */}
        </div>
      </div>
      <div className='m-nav'>
        <Link to="/" className='m-pflow'>PFLOW</Link>
        <div className="faBars">
          <FontAwesomeIcon className="faBars" icon={faBars} size="2x" onClick={onDropDown} />
        </div>
      </div>
      <ul ref={dropdownRef} className={`dropdown ${isOpen ? 'show' : ''}`}>
        <li><Link to="/resume/Resume">이력서 작성</Link></li>
        <li><Link to="/Chatbot">회사 추천</Link></li>
        <li><Link to="/Mypage">MY PAGE</Link></li>
        <li><Link to="/Community">커뮤니티</Link></li>
      </ul>
    </div>
  );
}

export default Header;
