import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Siderbar';
import './Mypage.css';


const Myactive = () => {
    const [boards, setBoards] = useState(''); // 게시글 정보 초기화
    const [comment, setComment] = useState(''); // 댓글 정보 초기화
    const [MyactiveTag, setMyactiveTag] = useState('나의게시물');
    

    useEffect(() => {
        const getBoardInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/mypage/myboards', {
                    method: "GET",
                    credentials: 'include', // 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    const data = await response.json(); // JSON 형식으로 응답 변환
                    console.log( '유저가 작성한 게시글:',data)
                    const localDate = new Date(data[0].board_date).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
                    console.log(`date 변환 : ${localDate}`)
                    
                    setBoards(data);
                    //setIsLogin(true);
                } else {
                    console.log('작성한 게시글 없음');
                }
            } catch (error) {
                console.error('경로 오류:', error);
                //setIsLogin(false);
            }
        };

        const getCommentInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/mypage/mycomment', {
                    method: "GET",
                    credentials: 'include', // 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    const data = await response.json(); // JSON 형식으로 응답 변환
                    console.log( '유저가 작성한 댓글:',data)
                    
                    setComment(data);
                    //setIsLogin(true);
                } else {
                    console.log('작성한 댓글 없음');
                }
            } catch (error) {
                console.error('경로 오류:', error);
                //setIsLogin(false);
            }
        };

        getBoardInfo();
        getCommentInfo(); // useEffect 내에서 호출
    }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 실행  <h1>{isLogin ? `${user?.user}님 환영합니다!` : '로그인 해주세요!'}</h1>

    const tagClick = (e) => {
    setMyactiveTag(e.target.value); 
    };

    // 게시글 삭제 함수
    const deleteBoard = async (board_id) => {
        console.log(board_id)
        const selectDelete = window.confirm('해당 게시물을 삭제하시겠습니까?');

        if(selectDelete) {
            console.log('게시물 삭제 진행')

            try{
                const response = await fetch(`http://localhost:5000/api/boards/${board_id}`, {
                    method: "DELETE",
                    credentials: 'include', // 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    const data = await response.json(); // JSON 형식으로 응답 변환
                    console.log( 'respons :',data)
                    
                    alert(data.message);
                } else {
                    console.log('errer message : ',Error)
                    alert('게시물 삭제 실패')
                }
            }catch{
                alert('삭제중 오류발생',Error)
            }
        } else {
            console.log('삭제 취소')
        }
    }

    // 댓글 삭제 함수
    const deleteComment = async (board_id,comment_id) => {
        console.log(comment_id)
        const selectDelete = window.confirm('해당 댓글을 삭제하시겠습니까?');

        if(selectDelete) {
            console.log('댓글 삭제 진행')

            try{
                const response = await fetch(`http://localhost:5000/api/boards/${board_id}/comments/${comment_id}`, {
                    method: "DELETE",
                    credentials: 'include', // 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    const data = await response.json(); // JSON 형식으로 응답 변환
                    console.log( 'respons :',data)
                    
                    alert(data.message);
                } else {
                    console.log('errer message : ',Error)
                    alert('댓글 삭제 실패')
                }
            }catch{

            }
        } else {
            console.log('삭제 취소')
        }
    }

    return (
        <div className="Myactive">
            <Sidebar/>
            <div className="myactive-saction">
            <h1>나의 활동</h1>
           <div className='select-tag'>
           <button value='나의댓글' onClick={tagClick} className='myactive-category-btn'>내가쓴 댓글</button> / <button value='나의게시물' onClick={tagClick} className='myactive-category-btn'>내가 쓴 게시물</button>
           </div>

           {MyactiveTag === '나의게시물' ? <table className="myactive-tb">
                <thead>
                <tr>
                    <th>작성번호</th>
                    <th>내가 쓴 게시물</th>
                    <th>작성일</th>
                    <th></th>
                </tr>
                </thead>
                             <tbody>
                             {Array.isArray(boards) && boards.length > 0 ? (
                                 boards.map((boards, index) => (
                                     <tr key={index}>
                                     <td>{boards.board_id}</td>
                                     <td className='post-td'>{boards.board_title}</td>
                                      <td>{boards.board_date.slice(0, 10)}</td>
                                        <td><button onClick={() => deleteBoard(boards.board_id)}>x</button></td>
                                     </tr>
                                     ))
                             ) : (<tr>
                                 <td colSpan="3">나의 활동기록이 없습니다.</td>
                               </tr>)}            
                         </tbody>
                         </table> : <table className="myactive-tb">
                         <thead>
                         <tr>
                             <th>작성번호</th>
                             <th>내가 쓴 댓글</th>
                             <th>작성일</th>
                             <th></th>
                         </tr>
                         </thead>
                    <tbody>
                    {Array.isArray(comment) && comment.length > 0 ? (
                        comment.map((comment, index) => (
                            <tr key={index}>
                            <td>{comment.board_id}</td>
                            <td className='post-td'>{comment.comment_content}</td>
                             <td>{comment.comment_date.slice(0, 10)}</td>
                             <td><button onClick={() => deleteComment(comment.board_id,comment.comment_id)}>x</button></td>
                            </tr>
                            ))
                    ) : (<tr>
                        <td colSpan="3">나의 활동기록이 없습니다.</td>
                      </tr>)}            
                </tbody>
                </table>}
            
                         
                
            
            </div>
        </div>
    );
};

export default Myactive;