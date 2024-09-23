import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Community.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTag, resetSelectedTag, fetchAllPosts, fetchCategoryPost, fetchHitPost } from '../slices/CategorySlice';

const Community = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [openModal, setOpenModal] = useState(false);
 

  const dispatch = useDispatch();
  const { allPosts, categoryData, selectedTag, Maxview} = useSelector((state) => state.category);

  // 최초 렌더링 시 모든 포스트를 가져온다
  useEffect(() => {
    dispatch(resetSelectedTag());
  }, []);

  // 카테고리 태그 선택 시 필터링된 포스트를 가져온다
  useEffect(() => {

    if (selectedTag && selectedTag !== '# 전체') {
      dispatch(fetchCategoryPost(selectedTag));
      
    } else {
      dispatch(fetchAllPosts());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchHitPost());
  }, [dispatch]);
console.log('max',Maxview);

// // 가장 높은 조회수 찾아서 반환하기... 포기 ~ _ ~
// useEffect(() => {
//   const findMaxView = () => {
//     if (allPosts.length === 0) return undefined;

//     const view = allPosts.map(post => post.board_view);
//     const maxView = Math.max(...view);
//     const maxPost = allPosts.find(post => post.board_view === maxView);
//     console.log(maxPost, maxView);
//     return {maxPost, maxView};
    
//   }
//   findMaxView();
// }, []);
  

  const titleOnChange = (e) => setTitle(e.target.value);
  const contentOnChange = (e) => setContent(e.target.value);
  const categoryOnChange = (e) => setCategory(e.target.value);

  const handlePost = async (e) => {
    e.preventDefault(); // 폼 제출 방지
    try {
      const resPost = await axios.post("http://localhost:5000/api/boards", {
        title,
        content,
        category
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // 응답 상태를 확인
      if (resPost.status !== 200) {
        console.log('Response not ok:', resPost);
        setOpenModal(false);
        alert('성공적으로 포스팅했습니다.');
        dispatch(resetSelectedTag());
      }
      // 성공적으로 포스트를 등록한 후, 전체 포스트를 다시 가져올 수 있습니다.
      // dispatch(fetchAllPosts());
    } catch (error) {
      console.error('Error posting:', error);
      alert('등록 오류입니다.');
    }
  };

  const handleWrite = () => {
    setOpenModal(!openModal);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
// 딕셔너리 형태로 각 숫자번호매핑
  const tagToId = {
    '# 면접후기': 1,
    '# 퇴사후기': 2,
    '# 취준일상': 3,
    '# 진로상담': 4,
  };

  const handleTag = (tag) => {
    dispatch(setSelectedTag(tag)); // 선택한 태그 업데이트
    
    const tagId = tagToId[tag];
    if (tagId) {
      dispatch(fetchCategoryPost(tagId));
    }
    // console.log(tagId);
  };

  const postList = selectedTag === '# 전체' ? allPosts : categoryData; // 카테고리별 포스트 또는 전체 포스트

  // console.log(postList);
 

   
  return (
    <div className='community'>
      <div className='popular-feed'>
        <span>실시간 인기글</span>
        <div className='popular-feed-data'>
        <h2>{Maxview.board_title}</h2>
       <span>{Maxview.board_content}</span>
       <span>조회수 {Maxview.board_view}</span>
        </div>
      </div>
      <div className='category-section'>
      <span className={`category-tag ${selectedTag === '# 전체' ? 'selected' : ''}`} onClick={() => handleTag('# 전체')}># 전체</span>
        <span className={`category-tag ${selectedTag === '# 면접후기' ? 'selected' : ''}`} onClick={() => handleTag('# 면접후기')}># 면접후기</span>
        <span className={`category-tag ${selectedTag === '# 퇴사후기' ? 'selected' : ''}`} onClick={() => handleTag('# 퇴사후기')}># 퇴사후기</span>
        <span className={`category-tag ${selectedTag === '# 취준일상' ? 'selected' : ''}`} onClick={() => handleTag('# 취준일상')}># 취준일상</span>
        <span className={`category-tag ${selectedTag === '# 진로상담' ? 'selected' : ''}`} onClick={() => handleTag('# 진로상담')}># 진로상담</span>
      </div>
      <h1>{selectedTag}</h1>
      <span className='counting-post'>총 {postList.length} 포스트</span>
      <button onClick={handleWrite} className='post-btn'>글쓰기</button>
      {openModal && (
        <div className='modal-post'>
          <form className='post-form' onSubmit={handlePost}>
            <button type="button" onClick={closeModal} className='close-btn'>X</button>
            <div className='post-title-section'>
              <input
                className='post-title'
                placeholder='제목을 입력해주세요.'
                value={title}
                onChange={titleOnChange}
              />
            </div>
            <select
              className='post-category'
              value={category}
              onChange={categoryOnChange}
            >
              <option value="" disabled hidden>카테고리 선택</option>
              <option value={1}>면접후기</option>
              <option value={2}>퇴사후기</option>
              <option value={3}>취준일상</option>
              <option value={4}>진로상담</option>
            </select>
            <div className='post-section'>
              <textarea
                className='post-area'
                placeholder='공유하고 싶은 생각이 있나요?'
                value={content}
                onChange={contentOnChange}
              ></textarea>
            </div>
            <button type="submit" className='post-submit'>등록하기</button>
          </form>
        </div>
      )}
      <table className='commu-header'>
        <thead>
          <tr>
            <th className='th-title'>제목</th>
            <th className='th-user'>작성자</th>
            <th className='th-date'>작성일</th>
            <th className='th-hits'>조회수</th>
          </tr>
        </thead>
        </table>
        {Array.isArray(postList) && postList.length > 0 ? (
  postList.map((post, index) => (
    <table key={index} className='post-list'>
      <tbody>
      
          <Link to={`/Community/${post.board_id}`}>
            <td className='td-title'>{post.board_title}</td>
            <td className='td-user'>{post.user_email}</td>
            <td className='td-date'>{post.board_date.slice(0, 10)}</td>
            <td className='td-hits'>{post.board_view}</td>
          </Link>
        
      </tbody>
    </table>
  ))
) : (
  <p>Loading...</p> // 데이터가 없을 때 보여줄 부분
)}
    </div>
  );
};

export default Community;
