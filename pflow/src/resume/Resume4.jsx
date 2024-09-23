// src/resume/Resume4.js
import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resume4.css";
import ProgressBar from "../components/ProgressBar";



const Resume4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');

  // console.log(JSON.stringify(data, null, 2))

// onCnahge 핸들러 

const imgOnChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file);

    // 파일 미리보기 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // 미리보기 URL을 상태에 저장
    };
    reader.readAsDataURL(file); // 파일을 Data URL로 읽기
  }
};
  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const introOnChange = (e) => {
    setIntro(e.target.value);
  };


// post 요청

const handlePost = async () => {

  try {
    console.log(title, intro, image);
    const response = await axios.post('http://localhost:5000/api/resumes',
      {
        skills: data.skill,
        education: data.eudInfo.univ,
        tranning: data.eudInfo.tranning,
        career: data.careerInfo,
        image: image,
        title: title,
        intro: intro
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(title, intro, image);
      console.log('respones ok:',response);
      navigate('/resume/Resume5');

  } catch (error) {
    console.log(image,title, intro);
    console.error('자기소개 전송오류:', error);
  }
};

  

  return (
    <div className="container">
   <div className='progress-div'>
      <ProgressBar/>
      </div>
      <form className="form">
      <h2>사용자님의 소개글을 작성해주세요!</h2>
      <p className="resume-guide">본인 업무경험을 기반으로 3~5줄로 요약하여 자기소개를 작성해주세요.</p>
      <div className="intro-section">
        <div>
          <input
          className="input-image"
          type="file"
          name="image"
          accept="image/*"
          onChange={imgOnChange}
          />
          {preview && (
             <img src={preview} alt="미리보기" style={{ width: '60px', height: 'auto' }} />
          )}
         
        </div>
        <div className="title-section">
        <input 
        className="input-title"
        placeholder="사용자님을 한줄로 소개할 제목을 작성해주세요."
        value={title}
        onChange={titleOnChange}
        />
        </div>
        <div className="textarea-section">
        <textarea
        maxlength="400"
        className="input-intro"
        placeholder="사용자님의 자기소개글을 작성해주세요."
        value={intro}
        onChange={introOnChange}
        />
        </div>
      </div>
           </form>
           <button className="next-btn"  onClick={handlePost}>save</button>
    </div>
  );
};

export default Resume4;
