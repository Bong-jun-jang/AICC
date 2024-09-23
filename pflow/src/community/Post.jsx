import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './Community.css';
import { useParams } from 'react-router-dom';

const Post = () => {
    
    const [boardData, setBoardData] = useState([]);
    const {board_id} = useParams();
    const [text, setText] = useState('');

    // console.log('boardID : ',board_id)
    const GetPost = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/boards/${board_id}`,
                {
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
            ); // 여기에 요청할 URL을 입력
                console.log('서버에서 받은 데이터 : ',response);
                const data = response.data;
                setBoardData(data);
        } catch (error) {
                console.error('error:', error);
            }
    };

    useEffect(() => {
      GetPost();
      console.log('한번만')
    }, []);

    // 텍스트 
    const TextOnChange = (e) => {
        setText(e.target.value);
    }
    
    // 댓글쓰기
    const commentPost = async (e) => {
        e.preventDefault(); // 폼 제출 방지
        try {
          const resPost = await axios.post(`http://localhost:5000/api/boards/${board_id}/comments`, {
            text,
          }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(`서버에서 받은 응답 : ${resPost}`);
          alert(resPost.data.message)
      
          // 응답 상태를 확인
          if (resPost.status !== 201) {
            console.log('Response not ok:', resPost);
          }
          // 성공적으로 포스트를 등록한 후, 전체 포스트를 다시 가져올 수 있습니다.
          // dispatch(fetchAllPosts());
        } catch (error) {
          console.error('Error posting:', error);
          alert('댓글 등록 오류입니다.');
        }
      };

    return (
        <div className='detail'>
            <div className='detail-form'>

            {boardData && boardData.length > 0 ? (
                <>
                <h2>{boardData[0].board_title}</h2>
                <div className="detail-header">
                    <span>작성자id: {boardData[0].board_user}</span>
                    <span>
                    작성일:{" "}
                    {new Date(boardData[0].board_date).toLocaleDateString("ko-KR", {
                        timeZone: "Asia/Seoul",
                    })}
                    </span>
                    <label>
                    조회 수: {boardData[0].board_view} <input type="checkbox" />
                    </label>
                </div>
                <div className="detail-content">{boardData[0].board_content}</div>
                </>
            ) : (
                <p>Loading...</p> // 데이터가 없을 때 보여줄 부분
            )}

            <form className='comment' onSubmit={commentPost}>
            <textarea className='comment-area' onChange={TextOnChange} placeholder='댓글을 남겨보세요.'/>
            <button type='submit' className='comment-submit'>등록</button>
            </form>
            <div className='comment-section'>
            {boardData.map((comment) => (
                <table key={comment.comment_id} className='comment-table'>
                <tbody>
                    <td className=''>{comment.comment_id}</td>
                    <td className=''>{comment.comment_content}</td>
                    <td className=''>{new Date(comment.comment_date).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                    <td className=''>{comment.comment_user}</td>
                </tbody>
                </table>
            ))}
            </div>
            </div>
        </div>
    );
};

export default Post;