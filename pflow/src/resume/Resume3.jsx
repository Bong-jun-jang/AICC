import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resume3.css";
import ProgressBar from "../components/ProgressBar";

const Resume3 = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [careerInfo, setCareerInfo] = useState([
    {
      id: 1,
      company: "",
      role: "",
      sdate: "",
      edate: "",
    },
  ]);
  console.log(JSON.stringify(data, null, 2))

  // // onchange 핸들러
  // const handleChange = (e) => {
  //   setCareerInfo(e.target.value);
  //   console.log(careerInfo);
  // };


// onchange 핸들러 수정
const handleChange = (e, id) => {
  const { name, value } = e.target;
  setCareerInfo((prevCareerInfo) =>
    prevCareerInfo.map((career) =>
      career.id === id ? { ...career, [name]: value } : career
    )
  );
};

  // 경력 추가 버튼 핸들러
  const addCareer = () => {
    const newCareer = {
      id: careerInfo.length + 1, // 현재 경력 배열의 길이에 +1
      company: "",
      role: "",
      sdate: "",
      edate: "",
    };

  // 최대 6번까지 추가 하도록 제한  
  if (careerInfo.length >= 6) {
    alert('경력은 최대 6개까지 추가할 수 있습니다.');
    return;
  }
  setCareerInfo([...careerInfo, newCareer]); // 새로운 경력 추가
  };

  // 경력 삭제 버튼 핸들러
  const delCareer = (id) => {
    setCareerInfo(careerInfo.filter((career) => career.id !== id)); // id로 삭제
  };



  // post 요청 핸들러
  const handlePost = async () => {
    try{
      // const response = await axios.post('http://localhost:5000/api/resumes',  careerInfo, {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      navigate('/resume/Resume4',{state: {...data, careerInfo }});

      console.log('respones ok:',);
    } catch (error) {
      console.error('경력정보 전송오류:', error);
      console.log(careerInfo);
    }
  };


  return (
    <div className="container">
      <div className="progress-div">
        <ProgressBar />
      </div>
      <form className="form">
        <h2 className="h2">사용자님의 경력을 입력해주세요!</h2>
        <button className="add-career-btn" type="button" onClick={addCareer}>
          + 추가
        </button>
        {careerInfo.map((career) => (
  <div className="career-section" key={career.id}>
    <div className="career-period">
      <input
        className="input-s-date"
        type="text"
        name="sdate"
        value={career.sdate}
        placeholder="시작일 ex) yyyy.mm"
        onChange={(e) => handleChange(e, career.id)} // id 전달
      />
      /
      <input
        className="input-e-date"
        type="text"
        name="edate"
        value={career.edate}
        placeholder="종료일 ex) yyyy.mm"
        onChange={(e) => handleChange(e, career.id)} // id 전달
      />
    </div>
    <div className="career-company">
      <input
        className="input-company"
        type="text"
        name="company"
        value={career.company}
        placeholder="회사명"
        onChange={(e) => handleChange(e, career.id)} // id 전달
      />
      <input
        className="input-role"
        type="text"
        name="role"
        value={career.role}
        placeholder="부서명 / 직책"
        onChange={(e) => handleChange(e, career.id)} // id 전달
      />
    </div>
    <button
      className="del-career-btn"
      type="button"
      onClick={() => delCareer(career.id)}
    >
      x
    </button>
  </div>
))}
      </form>
      <button className="next-btn" type="button" onClick={handlePost}>
  save
</button>
    </div>
  );
};

export default Resume3;
