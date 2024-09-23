// src/components/ProgressBar.js
//import React, { useContext } from "react";
//import { ProgressContext } from "../context/ProgressContext.jsx";
import { useLocation } from "react-router-dom";
import "./components.css";
//import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const ProgressBar = () => {
  //const { progress, setProgress, totalSteps } = useContext(ProgressContext);
 // const percentage = (progress / totalSteps) * 100;

  const location = useLocation();
// console.log(location.pathname);
 const path = location.pathname.split('/resume/Resume');
// console.log(path[1]);
 const pathNum = path[1]


  return (
    <>
      <ul className="Step-Section">
        <li className="Step1">
        <span className="Text1"
  style={{
    color: location.pathname === '/resume/Resume1' ? 'blue' : 'grey',
    fontSize: location.pathname === '/resume/Resume1' ? '20pt' : '16pt'
  }}
>
  보유기술
</span>
        </li>
        <li className="Step">
          <span className="Text2" style={{
    color: location.pathname === '/resume/Resume2' ? 'blue' : 'grey',
    fontSize: location.pathname === '/resume/Resume2' ? '20pt' : '16pt'
  }}>교육/학력</span>
        </li>
        <li className="Step">
          <span className="Text3" style={{
    color: location.pathname === '/resume/Resume3' ? 'blue' : 'grey',
    fontSize: location.pathname === '/resume/Resume3' ? '20pt' : '16pt'
  }}>경력사항</span>
        </li>
        <li className="Step">
          <span className="Text4" style={{
    color: location.pathname === '/resume/Resume4' ? 'blue' : 'grey',
    fontSize: location.pathname === '/resume/Resume4' ? '20pt' : '16pt'
  }}>자기소개</span>
        </li>
        <li className="Step">
          <span className="Text5" style={{
    color: location.pathname === '/resume/Resume5' ? 'blue' : 'grey',
    fontSize: location.pathname === '/resume/Resume5' ? '20pt' : '16pt'
  }}>테마선택</span>
        </li>
      </ul>
      <div className="progress-bar-container">
      <div className="progress" style={{ width: `${pathNum * 20}%` }} />
      </div>
    </>
  );
};

export default ProgressBar;

// 프로그레스바 로직 재수정 url기준으로 width 늘어남.