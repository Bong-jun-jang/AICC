import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resume1.css";
import ProgressBar from "../components/ProgressBar";

const Resume1 = () => {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // 입력 필드의 값이 변경될 때 호출되는 핸들러
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 'Add' 버튼 클릭 시 호출되는 핸들러
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    if (skills.length >= 7) {
      alert("기술 목록은 최대 7개까지 추가할 수 있습니다.");
      return;
    }
    setSkills((prevSkills) => [...prevSkills, inputValue]);
    setInputValue("");
  };

  // 기술 삭제 핸들러
  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

 // console.log(skills); 값 확인하려면 주석 지워보세요...

 // 기술 저장 post 요청 핸들러

 const handlePost = async () => {
  try {
    // const response = await axios.post('http://localhost:5000/api/resumes', 
    //   skills, {
    //     withCredentials: true,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });

      console.log('respones ok:',);
      navigate('/resume/Resume2', {state: {skill: skills}});
      


  } catch (error) {
    console.error('기술정보 전송오류:', error);
  }
  };
  
 
  return (
    <div className="container">
      <div className='progress-div'>
        <ProgressBar />
      </div>
      <form className="form-1">
        <div className="skills">
          <div className="add-skill-section">
            <h2 className="resume-title">보유하신 기술정보를 입력해주세요!</h2>
            <input
              className="skill-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="  ex) 데이터 분석"
            />
            <button
              className="add-skill-btn"
              onClick={handleAddSkill}
            >
              Add
            </button>
          </div>
          <ul className="skill-list">
            {skills.map((skill, index) => (
              <ul key={index} className="skill-ul">
                <ul className="my-skill">
                # {skill}
                </ul>
                {/* 마지막 항목인지 확인하여 삭제 버튼 렌더링 */}
                {index === skills.length - 1 && (
                  <button
                    className="del-skill-btn"
                    onClick={() => handleDeleteSkill(index)}
                  >
                    x
                  </button>
                )}
              </ul>
            ))}
          </ul>
        </div>
      </form>
      <button className="next-btn" onClick={handlePost}>save</button>
    </div>
  );
};

export default Resume1;
