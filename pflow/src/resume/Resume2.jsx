// src/resume/Resume2.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resume2.css";
import ProgressBar from "../components/ProgressBar";

const Resume2 = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [eudInfo, setEudInfo] = useState({
    univ: {
      name: '',
      major: '',
      gdate: '',
      graduate: ''
    },
    tranning: {
      academy: '',
      description: '',
      sdate: '',
      edate: ''
    }
  });
  console.log(JSON.stringify(data, null, 2))

  // handleChange 함수 정의
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    
    if (dataset.section) {
      setEudInfo(prevState => ({
        ...prevState,
        [dataset.section]: {
          ...prevState[dataset.section],
          [name]: value
        }
      }));
    }
  };

  const handlePost = async () => {
    try{
      // const response = await axios.post('http://localhost:5000/api/resumes',
      //   eudInfo, {
      //     withCredentials: true,
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   });

      console.log('respones ok:',);
      navigate('/resume/Resume3',{state: {...data, eudInfo }});

    } catch (error) {
      console.error('학력정보 전송오류:', error);
    }
  };

  return (
    <div className="container">
      <div className='progress-div'>
        <ProgressBar/>
      </div>
      <form className="form-2">
        <h2 className="h2">사용자님의 교육과 학력정보를 입력해주세요!</h2>
        <p className="resume-guide">최종 학력과 교육연수 정보를 최신순으로 작성해주세요.</p>
        <h4 className="eud-sub-title">학력사항</h4>
        <div className='univ-section'>
          <div className="univ-info">
            <input
              className="input-univ"
              type="text"
              name="name"
              data-section="univ"
              value={eudInfo.univ.name}
              onChange={handleChange}
              placeholder="학교명"
            />
            <input
              className="input-major"
              type="text"
              name="major"
              data-section="univ"
              value={eudInfo.univ.major}
              onChange={handleChange}
              placeholder="학과 전공"
            />
          </div>
          <div className="univ-period">
            <input
              className="input-period"
              type="text"
              name="gdate"
              data-section="univ"
              placeholder="졸업일 ex) yyyy.mm"
              value={eudInfo.univ.gdate}
              onChange={handleChange}
            />
            <select
              className="input-graduate"
              name="graduate"
              data-section="univ"
              value={eudInfo.univ.graduate}
              onChange={handleChange}
            >
              <option value="" disabled hidden>졸업 여부</option>
              <option value= {1} >졸업</option>
              <option value= {2}>재학</option>
              <option value= {3} >휴학</option>
              <option value= {4}>중퇴</option>
            </select>
          </div>
        </div>
        <div className='academic-section'>
          <h4 className="eud-sub-title">교육사항</h4>
          <div className="academic-info">
            <input
              className="input-academic"
              type="text"
              name="academy"
              data-section="tranning"
              value={eudInfo.tranning.academy}
              onChange={handleChange}
              placeholder="연수기관"
            />
            <div className="academic-period">
              <input
                className="input-s-date"
                type="text"
                name="sdate"
                data-section="tranning"
                placeholder="시작일 ex) yyyy.mm"
                value={eudInfo.tranning.sdate}
                onChange={handleChange}
              />/
              <input
                className="input-e-date"
                type="text"
                name="edate"
                data-section="tranning"
                placeholder="종료일 ex) yyyy.mm"
                value={eudInfo.tranning.edate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="academic-info">
            <input
              className="input-description"
              type="text"
              name="description"
              data-section="tranning"
              value={eudInfo.tranning.description}
              onChange={handleChange}
              placeholder="연수과정 및 내용"
            />
          </div>
        </div>
             </form>
             <button className="next-btn" onClick={handlePost}>save</button>

    </div>
  );
};

export default Resume2;
