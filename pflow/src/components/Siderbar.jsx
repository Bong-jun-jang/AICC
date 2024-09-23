import React from "react";
import { Link } from "react-router-dom";
import './components.css';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/AuthSlice'; // api 로직 가져오기


const Sidebar = () => {
    
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout()); // 비동기 액션 디스패치
    };

        return (
        <nav className="sidebar">
            <ul className="side-links">
                <li>
                <Link to="/MyPage">나의 프로필</Link>
                </li>  
                <li>
                <Link to="/MyPage/Myactive">내 활동</Link>
                </li>  
                <li>
                <Link to="/MyPage/MyResume">내 이력서</Link>
                </li>
               <button onClick={handleLogOut}>로그아웃</button>
            </ul>
        </nav>
    );
};

export default Sidebar;