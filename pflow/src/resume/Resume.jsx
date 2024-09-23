// src/resume/Resume1.js
import React from "react";
//import "./Resume.css";
import { useTheme } from '../context/ThemeContext'; // useTheme 훅을 사용

import ProgressBar from "../components/ProgressBar";



const Resume = () => {
    const { theme, changeTheme } = useTheme();

    const handleChangeTheme = (newColor) => {
        changeTheme(newColor);
    };

    return (
        <div className="container">
            <div className="form1-5">
                <h1>반갑습니다! PFLOW와 함께 이력서를 작성해보세요 : )</h1>
                <button>next</button>
            <div className="resume-1">
            <h2>신입 머신러닝 개발자 홍길동입니다.</h2>
                <div className="section-1">
                    <img src="/image.png" alt="증명사진 아이콘" className="img"/>     
                    <table className="resume-table">
                    <tr>
                        <th>
                            이름
                        </th>
                        <td>
                            홍길동
                        </td>
                        <th>
                            나이
                        </th>
                        <td>
                            25세
                        </td>
                    </tr>
                    <tr>
                        <th>
                            휴대폰
                        </th>
                        <td>
                            010-1234-5678
                        </td>
                        <th>
                            주소
                        </th>
                        <td>
                           서울시 금천구 / 가산디지털1로 219 5층
                        </td>
                    </tr>
                    <tr>
                        <th>
                            이메일
                        </th>
                        <td>
                            test1234@naver.com
                        </td>
                        <th>
                            github
                        </th>
                        <td>
                        github.pflow
                        </td>
                    </tr>
                    </table>
            </div>
            <h3 className="resume-sub-title">Education</h3> 
            <table className="resume-table">
                <tr>
                    <th className="th-rowspan" rowSpan={2}>
                        학력
                    </th>
                   <th>
                    학교명
                   </th>
                   <th>
                    전공
                   </th>
                   <th>
                    졸업일
                   </th>
                   <th>
                    구분
                   </th>
                </tr>
                <tr>
                    <td>경북대</td>
                    <td>컴퓨터공학과</td>
                    <td>2024-10-21</td>
                    <td>졸업</td>
                </tr>
            </table>

            <table className="resume-table">
                <tr>
                    <th className="th-rowspan" rowSpan={3}>
                        교육과정
                    </th>
                   <th>
                    구분
                   </th>
                   <th>
                    과정내용
                   </th>
                </tr>
                <tr>
                    <td>k-digital</td>
                    <td>(AICC) 웹서비스개발</td>
                </tr>
            </table>
            <h3 className="resume-sub-title"> Tech Stack</h3> 
            <table className="resume-table">
                <tr>
                    <th className="th-rowspan" rowSpan={2}>
                        보유기술
                    </th>
                  
                </tr>
                <tr>
                    <td>
                       <ul className="stack">
                        <li>
                            python
                        </li>
                        <li>
                            kotlin
                        </li>
                        <li>
                            java
                        </li>
                        <li>
                            pandas
                        </li>
                        <li>
                            pytorch
                        </li>
                       </ul>
                    </td>
                </tr>
            </table>
            <h3 className="resume-sub-title">Career</h3>
            <table className="resume-table">
                <tr>
                    <th className="th-rowspan" rowSpan={4}>
                        실무경력
                    </th>
                    <th>
                        회사명
                    </th>
                    <th>
                        직무
                    </th>
                    <th>
                        입사일
                    </th>
                    <th>
                        퇴사일
                    </th>
                    </tr>
                    <tr>
                        <td>
                            네이버
                        </td>
                        <td>
                            머신러닝 개발
                        </td>
                        <td>
                            2022-08-01
                        </td>
                        <td>
                            2023-12-01
                        </td>
                    </tr>
                    <tr>
                        <td>
                            당근마켓
                        </td>
                        <td>
                            머신러닝 개발
                        </td>
                        <td>
                            2022-08-01
                        </td>
                        <td>
                            2023-12-01
                        </td>
                    </tr>
                    <tr>
                        <td>
                            요기요
                        </td>
                        <td>
                            머신러닝 개발
                        </td>
                        <td>
                            2022-08-01
                        </td>
                        <td>
                            2023-12-01
                        </td>
                    </tr>
            </table>
            <h3 className="resume-sub-title">자기소개</h3>
            <dd >저는머신러닝 분야에서 성장하고, 더 나아가 인공지능 기술을 선도하는 엔지니어가 되고자 합니다. 특히, 귀사에서 진행하는 다양한 머신러닝 프로젝트에 참여하여 실제 비즈니스 문제를 해결하는 데 기여하고 싶습니다. 이를 통해 실무 경험을 쌓고, 귀사의 성과에 기여하며, 저만의 전문성을 쌓아나가고자 합니다. 머신러닝에 대한 열정과 학업, 프로젝트 경험을 바탕으로 귀사에서 새로운 도전을 하고 싶습니다. 비록 신입이지만, 빠르게 배우고 적응하며 팀에 기여할 자신이 있습니다. 저의 성실함과 열정을 바탕으로 귀사에서 성장할 수 있는 기회를 주신다면, 최고의 성과로 보답하겠습니다. 감사합니다.

</dd>
            </div>
            </div>
        </div>
    );
};

export default Resume;
